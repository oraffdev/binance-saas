import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { EncryptionService } from "../common/services/encryption.service";
import { StrategyService } from "../strategy/strategy.service";
import * as ccxt from "ccxt";
import { Bot, Trade } from "@/generated/client";

@Processor("trade-queue", {
	concurrency: 10, // Processa 10 bots simultaneamente por instância
})
export class TradeProcessor extends WorkerHost {
	private readonly logger = new Logger(TradeProcessor.name);

	constructor(
		private readonly prisma: PrismaService,
		private readonly encryption: EncryptionService,
		private readonly strategyService: StrategyService,
	) {
		super();
	}

	async process(job: Job<{ botId: string }>): Promise<any> {
		const { botId } = job.data;

		try {
			// 1. Busca o BOT com os dados do USUÁRIO dono
			const bot = await this.prisma.bot.findUnique({
				where: { id: botId },
				include: { user: true },
			});

			// Validações básicas de segurança
			if (!bot || !bot.isActive || !bot.user.isActive) {
				return;
			}

			this.logger.debug(
				`🤖 Processando Bot: ${bot.name} (${bot.symbol}) | TF: ${bot.timeframe}`,
			);

			// 2. Configura Exchange (Binance Futures)
			const apiKey = this.encryption.decrypt(bot.user.apiKey);
			const secret = this.encryption.decrypt(bot.user.apiSecret);

			const exchange = new ccxt.binance({
				apiKey: apiKey,
				secret: secret,
				options: { defaultType: "future" }, // Força API de Futuros
				enableRateLimit: true,
			});

			exchange.setSandboxMode(true); // MODO TESTNET (Remova para produção)

			// Carrega mercados (Essencial para precisão de preços)
			await exchange.loadMarkets();

			// 3. Busca se este BOT específico já tem trade aberto
			const openTrade = await this.prisma.trade.findFirst({
				where: { botId: bot.id, status: "OPEN" },
			});

			if (openTrade) {
				// 🔄 MODO SINCRONIZAÇÃO: Verificar se TP ou SL foram atingidos
				await this.syncOpenTrade(exchange, openTrade, bot.user.email);
			} else {
				// 🚀 MODO CAÇA: Procurar novas oportunidades
				await this.huntForTrades(exchange, bot);
			}
		} catch (error) {
			this.logger.error(`❌ Falha no Bot ${botId}: ${error.message}`);
			// Não damos throw error aqui para não travar a fila, apenas logamos.
			// Se fosse erro de rede, o BullMQ tentaria de novo se dermos throw.
		}
	}

	// --- 🔄 LÓGICA DE SINCRONIZAÇÃO ---
	private async syncOpenTrade(
		exchange: ccxt.Exchange,
		trade: Trade,
		userEmail: string,
	) {
		try {
			// Busca posições abertas na Binance
			const positions = await exchange.fetchPositions([trade.symbol]);
			const position = positions.find((p) => p.symbol === trade.symbol);

			// Se não achou posição OU contracts é 0, o trade fechou (TP ou SL pegou)
			const isClosedOnBinance = !position || Number(position.contracts) === 0;

			if (isClosedOnBinance) {
				this.logger.log(
					`🕵️ Bot ${trade.symbol}: Posição fechada na Binance. Atualizando banco...`,
				);

				// 1. Limpeza: Cancela ordens pendentes (ex: se bateu TP, cancela o SL que sobrou)
				try {
					await exchange.cancelAllOrders(trade.symbol);
				} catch (e) {
					// Ignora erro se não tiver ordens para cancelar
				}

				// 2. Tenta pegar o preço atual para estimar PnL
				// 2. Tenta pegar o preço atual
				const ticker = await exchange.fetchTicker(trade.symbol);

				// CORREÇÃO: Se ticker.last for undefined, usamos 0 (embora na Binance Futures sempre venha)
				const exitPrice = ticker.last || 0;

				let pnl = 0;
				// Adicionei uma proteção extra para não calcular PnL com preço zero
				if (exitPrice > 0) {
					if (trade.side === "BUY_LONG") {
						pnl = (exitPrice - trade.entryPrice) * trade.amount;
					} else {
						pnl = (trade.entryPrice - exitPrice) * trade.amount;
					}
				}

				// 3. Atualiza Banco
				await this.prisma.trade.update({
					where: { id: trade.id },
					data: {
						status: "CLOSED",
						exitPrice: exitPrice,
						pnl: pnl,
						closedAt: new Date(),
						exitReason: "MARKET_TRIGGER",
					},
				});
				this.logger.log(`✅ Trade finalizado no banco.`);
			} else {
				this.logger.debug(
					`🛡️ Posição ainda aberta para ${trade.symbol}. Monitorando...`,
				);
			}
		} catch (error) {
			this.logger.error(
				`Erro ao sincronizar trade ${trade.id}: ${error.message}`,
			);
		}
	}

	// --- 🚀 LÓGICA DE CAÇA (HUNT) ---
	private async huntForTrades(exchange: ccxt.Exchange, bot: Bot) {
		const tfMap: Record<string, string> = { M15: "15m", H1: "1h", H4: "4h" };
		const ccxtTimeframe = tfMap[bot.timeframe];

		if (!ccxtTimeframe) return;

		// Busca Candles
		const candles = await this.fetchCandles(
			exchange,
			bot.symbol,
			ccxtTimeframe,
		);

		const analysis = this.strategyService.analyzeMarket(candles);

		if (analysis.action !== "NEUTRAL") {
			// Proteção contra candle vazio
			const lastCandle = candles[candles.length - 1];
			if (!lastCandle || !lastCandle.close) {
				this.logger.warn("Sinal ignorado: Dados de preço incompletos.");
				return;
			}
			const currentPrice = lastCandle.close;

			// CORREÇÃO: Usamos 'analysis.action' e 'analysis.reason'
			this.logger.log(
				`🚀 SINAL ${analysis.action} | Motivo: ${analysis.reason} | ${analysis.details}`,
			);

			await this.executeBracketTrade(
				exchange,
				bot,
				analysis.action,
				currentPrice,
			);
		} else {
			// Log de espera
			this.logger.debug(`💤 ${bot.name} (Wait): ${analysis.reason}`);
		}
	}
	// --- ⚡ LÓGICA DE EXECUÇÃO (BRACKET) ---
	private async executeBracketTrade(
		exchange: ccxt.Exchange,
		bot: Bot,
		side: string,
		price: number,
	) {
		// Define direção Binance
		const binanceSide = side === "BUY_LONG" ? "buy" : "sell";
		const exitSide = side === "BUY_LONG" ? "sell" : "buy";

		// LÊ AS CONFIGURAÇÕES DO BOT DO BANCO
		const TAKE_PROFIT_PCT = bot.tp; // ex: 0.015
		const STOP_LOSS_PCT = bot.sl; // ex: 0.01
		const AMOUNT = bot.amount; // ex: 50

		let tpPrice = 0;
		let slPrice = 0;

		// Calcula Preços Alvo
		if (side === "BUY_LONG") {
			tpPrice = price * (1 + TAKE_PROFIT_PCT);
			slPrice = price * (1 - STOP_LOSS_PCT);
		} else {
			// Short: Lucro na queda, Stop na subida
			tpPrice = price * (1 - TAKE_PROFIT_PCT);
			slPrice = price * (1 + STOP_LOSS_PCT);
		}

		// Formatação de Precisão (Obrigatório para Binance)
		const tpFmt = Number(exchange.priceToPrecision(bot.symbol, tpPrice));
		const slFmt = Number(exchange.priceToPrecision(bot.symbol, slPrice));

		try {
			this.logger.log(
				`🎯 Enviando Ordens ${bot.symbol} | Entrada: ~${price} | TP: ${tpFmt} | SL: ${slFmt}`,
			);

			// 1. Ordem de Entrada a Mercado
			const order = await exchange.createOrder(
				bot.symbol,
				"market",
				binanceSide,
				AMOUNT,
			);
			const entryPriceReal = order.price || price;

			// 2. Ordem Take Profit
			await exchange.createOrder(
				bot.symbol,
				"TAKE_PROFIT_MARKET",
				exitSide,
				AMOUNT,
				undefined,
				{
					stopPrice: tpFmt,
					reduceOnly: true,
				},
			);

			// 3. Ordem Stop Loss
			await exchange.createOrder(
				bot.symbol,
				"STOP_MARKET",
				exitSide,
				AMOUNT,
				undefined,
				{
					stopPrice: slFmt,
					reduceOnly: true,
				},
			);

			// 4. Salva no Banco
			await this.prisma.trade.create({
				data: {
					botId: bot.id,
					symbol: bot.symbol,
					status: "OPEN",
					side: side,
					amount: AMOUNT,
					entryPrice: entryPriceReal,
				},
			});

			this.logger.log(`✅ Trade criado e salvo com sucesso!`);
		} catch (error) {
			this.logger.error(`❌ Erro ao executar trade: ${error.message}`);
			// Dica Senior: Se a entrada foi executada mas TP/SL falharam,
			// aqui seria o lugar de tentar fechar a posição imediatamente para segurança.
		}
	}

	// --- HELPERS ---
	private async fetchCandles(
		exchange: ccxt.Exchange,
		symbol: string,
		timeframe: string,
	) {
		// Busca 200 velas para cálculo de EMA/RSI
		const ohlcv = await exchange.fetchOHLCV(symbol, timeframe, undefined, 200);

		// Mapeia array do CCXT para objeto legível
		return ohlcv.map((c) => ({
			open: c[1],
			high: c[2],
			low: c[3],
			close: c[4],
			volume: c[5],
			closeTime: c[0],
		}));
	}
}
