import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { StrategyService } from "../strategy/strategy.service";
import * as ccxt from "ccxt"; // Usaremos ccxt para facilitar a conexão na Fase 1

@Injectable()
export class TradeScheduler {
	private readonly logger = new Logger(TradeScheduler.name);
	private exchange: ccxt.Exchange;

	constructor(private readonly strategyService: StrategyService) {
		// Inicializa conexão com Binance Testnet (Futuros)
		this.exchange = new ccxt.binanceusdm({
			apiKey: process.env.BINANCE_API_KEY, // Nunca hardcode chaves!
			secret: process.env.BINANCE_API_SECRET,
			options: { defaultType: "future" }, // Importante: Futuros
		});
		this.exchange.setSandboxMode(true); // Ativa modo Testnet
	}

	// Executa a cada 1 hora (Cron Job)
	// Para testes, você pode mudar para CronExpression.EVERY_MINUTE
	@Cron(CronExpression.EVERY_HOUR)
	async handleCron() {
		this.logger.log("⏰ Iniciando ciclo de trading...");

		try {
			// 1. Buscar Dados (Candles)
			// Symbol: SOL/USDT, Timeframe: 1h, Limit: 300 (para ter histórico p/ EMA200)
			const ohlcv = await this.exchange.fetchOHLCV(
				"SOL/USDT",
				"1h",
				undefined,
				300,
			);

			// Mapear resposta do ccxt para nossa interface CandleData
			const candles = ohlcv.map((c) => ({
				open: c[1],
				high: c[2],
				low: c[3],
				close: c[4],
				volume: c[5],
				closeTime: c[0],
			}));

			// 2. Executar Estratégia
			const signal = this.strategyService.analyzeMarket(candles);

			// 3. Executar Ação (Fase 1: Execução Direta)
			if (signal.action !== "NEUTRAL") {
				this.logger.log(
					`🚀 SINAL DETECTADO: ${signal.action} @ ${signal.price}`,
				);

				// Na Fase 1, executamos a ordem diretamente aqui
				await this.executeOrder(signal.action, 0.1); // Ex: 0.1 SOL
			} else {
				this.logger.log("😴 Mercado neutro. Nenhuma ação tomada.");
			}
		} catch (error) {
			this.logger.error("Erro no ciclo de trading", error);
		}
	}

	private async executeOrder(side: string, amount: number) {
		// Mapeamento simples para ordem de mercado
		const type = "market";
		const symbol = "SOL/USDT";
		const sideCcxt = side === "BUY_LONG" ? "buy" : "sell";

		try {
			// Cria a ordem de mercado
			const order = await this.exchange.createOrder(
				symbol,
				type,
				sideCcxt,
				amount,
			);
			this.logger.log(`✅ Ordem executada! ID: ${order.id}`);

			// Nota: Em um cenário real, aqui colocaríamos o Stop Loss e Take Profit (OCO)
			// Mas a API de Futuros exige chamadas separadas para SL/TP em muitos casos.
		} catch (e) {
			this.logger.error("Falha ao executar ordem na Binance", e);
		}
	}
}
