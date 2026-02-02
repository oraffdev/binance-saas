import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { StrategyService } from "../strategy/strategy.service";
import { PrismaService } from "../prisma/prisma.service";
import { EncryptionService } from "../common/services/encryption.service";
import * as ccxt from "ccxt";

@Injectable()
export class TradeScheduler {
	private readonly logger = new Logger(TradeScheduler.name);

	constructor(
		private readonly strategyService: StrategyService,
		private readonly prisma: PrismaService,
		private readonly encryption: EncryptionService,
	) {}

	@Cron(CronExpression.EVERY_MINUTE) // Executa a cada hora cheia
	async handleCron() {
		this.logger.log("🔄 Iniciando ciclo de trading Multi-User...");

		const users = await this.prisma.user.findMany({
			where: { isActive: true },
		});
		this.logger.log(`👥 Encontrados ${users.length} usuários ativos.`);

		for (const user of users) {
			await this.processUser(user);
		}
	}

	private async processUser(user: any) {
		try {
			// 2. Descriptografar chaves
			const apiKey = this.encryption.decrypt(user.apiKey);
			const secret = this.encryption.decrypt(user.apiSecret);

			// 3. Conectar na Binance
			const exchange = new ccxt.binance({
				apiKey,
				secret,

				options: {
					defaultType: "future",
				},
			});
			exchange.setSandboxMode(true);
			await exchange.loadMarkets();

			const openTrade = await this.prisma.trade.findFirst({
				where: { userId: user.id, status: "OPEN" },
			});

			// 5. Baixar dados de mercado
			const candles = await this.fetchCandles(exchange, "SOL/USDT");
			const currentPrice = candles[candles.length - 1].close;

			if (openTrade) {
				this.logger.log(
					`🛡️ User ${user.email} já tem trade aberto (Entrada: ${openTrade.entryPrice}). Ignorando novos sinais.`,
				);
				// Futuro: Aqui implementaríamos a lógica de saída (Take Profit / Stop Loss)
				return;
			}

			// 6. Analisar Mercado
			const signal = this.strategyService.analyzeMarket(candles);

			if (signal.action !== "NEUTRAL") {
				this.logger.log(`🚀 SINAL ${signal.action} para ${user.email}`);
				await this.executeTrade(
					exchange,
					user.id,
					signal.action,
					0.1,
					currentPrice,
				);
			} else {
				this.logger.debug(`💤 User ${user.email}: Mercado Neutro.`);
			}
		} catch (e) {
			this.logger.error(`Erro processando user ${user.email}: ${e.message}`);
		}
	}

	private async executeTrade(
		exchange: ccxt.Exchange,
		userId: string,
		side: string,
		amount: number,
		price: number,
	) {
		// A. Executa na Binance
		// const binanceSide = side === 'BUY_LONG' ? 'buy' : 'sell';
		// await exchange.createOrder('SOL/USDT', 'market', binanceSide, amount);

		// B. Salva no Banco ("Memória")
		await this.prisma.trade.create({
			data: {
				userId,
				symbol: "SOL/USDT",
				status: "OPEN",
				side,
				amount,
				entryPrice: price,
			},
		});
		this.logger.log(`✅ Trade salvo no banco com sucesso!`);
	}

	private async fetchCandles(exchange: ccxt.Exchange, symbol: string) {
		const ohlcv = await exchange.fetchOHLCV(symbol, "1h", undefined, 200);
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
