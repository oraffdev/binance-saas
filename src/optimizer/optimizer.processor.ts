import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import * as ccxt from "ccxt";
import { EncryptionService } from "../common/services/encryption.service";
import { PrismaService } from "../prisma/prisma.service";
import { StrategyService } from "../strategy/strategy.service"; // <--- Importe o Strategy
import { ENV } from "@/env";
import { EnumTimeframeFilter } from "@/generated/commonInputTypes";

@Processor("optimizer-queue", {
	concurrency: 2, // Otimização gasta CPU, melhor reduzir a concorrência
})
export class OptimizerProcessor extends WorkerHost {
	private readonly logger = new Logger(OptimizerProcessor.name);

	constructor(
		private readonly prisma: PrismaService,
		private readonly strategyService: StrategyService,
	) {
		super();
	}

	async process(job: Job<{ symbol: string; timeframe: EnumTimeframeFilter }>) {
		try {
			const { symbol, timeframe } = job.data;
			this.logger.log(`🔧 Otimizando ${symbol} - ${timeframe}...`);

			// NÃO precisamos buscar os bots aqui.
			// Se não acharmos configuração melhor, não fazemos nada.
			// Se acharmos, damos updateMany com filtro.

			// 1. Setup Exchange (Admin Keys)
			const apiKey = ENV.BINANCE_API_KEY;
			const secret = ENV.BINANCE_API_SECRET;
			const exchange = new ccxt.binance({
				apiKey,
				secret,
				options: { defaultType: "future" },
				enableRateLimit: true,
			});

			// 2. Mapeamento e Download de Dados
			const tfMap: Record<string, string> = { M15: "15m", H1: "1h", H4: "4h" };
			const ccxtTimeframe = tfMap[timeframe as string];

			const candles = await this.fetchHistoricalCandles(
				exchange,
				symbol,
				ccxtTimeframe,
				20,
			);

			if (candles.length < 200) {
				this.logger.warn(`Dados insuficientes para ${symbol}. Abortando.`);
				return;
			}

			// 3. Grid Search
			const tpOptions = [0.01, 0.015, 0.02, 0.03, 0.04, 0.05, 0.06];
			const slOptions = [0.01, 0.015, 0.02, 0.025, 0.03, 0.04];

			// Inicializa com score negativo. Se nada superar 0, não mudamos nada.
			let bestConfig = { tp: 0, sl: 0, score: 0 };

			for (const tp of tpOptions) {
				for (const sl of slOptions) {
					if (tp <= sl) continue;

					const result = this.runSimulation(candles, tp, sl);

					// Score = Lucro * WinRate (filtra estratégias negativas)
					const score = result.profit > 0 ? result.profit * result.winRate : -1;

					if (score > bestConfig.score) {
						bestConfig = { tp, sl, score };
					}
				}
			}

			// 4. Atualização Segura
			if (bestConfig.score > 0) {
				// CORREÇÃO: updateMany AGORA FILTRA POR autoTune: true
				const updateResult = await this.prisma.bot.updateMany({
					where: {
						symbol: symbol,
						timeframe: timeframe,
						autoTune: true, // <--- SÓ ATUALIZA QUEM PEDIU
					},
					data: {
						tp: bestConfig.tp,
						sl: bestConfig.sl,
						lastTunedAt: new Date(),
					},
				});

				this.logger.log(
					`✅ ${symbol}/${timeframe}: ${updateResult.count} bots atualizados! Novo TP: ${(bestConfig.tp * 100).toFixed(1)}% / SL: ${(bestConfig.sl * 100).toFixed(1)}%`,
				);
			} else {
				this.logger.warn(
					`⚠️ ${symbol}: Nenhuma config lucrativa encontrada. Mantendo atuais.`,
				);
			}
		} catch (error) {
			this.logger.error(`❌ CRASH NO WORKER: ${error.message}`, error.stack);
			throw error; // Lança o erro de novo para o BullMQ saber que falhou
		}
	}

	private async fetchHistoricalCandles(
		exchange: ccxt.Exchange,
		symbol: string,
		timeframe: string,
		days: number,
	) {
		const since = exchange.milliseconds() - days * 24 * 60 * 60 * 1000;

		// CORREÇÃO 1: Tipagem explícita do array do CCXT
		let candles: ccxt.OHLCV[] = [];

		let fetchSince = since;

		while (true) {
			const batch = await exchange.fetchOHLCV(
				symbol,
				timeframe,
				fetchSince,
				1000,
			);

			if (!batch || batch.length === 0) break;

			candles = candles.concat(batch);

			const lastCandle = batch[batch.length - 1];

			// CORREÇÃO: Usamos o operador '!' para garantir que existe, ou um cast simples
			if (lastCandle?.[0]) {
				fetchSince = (lastCandle[0] as number) + 1;
			}

			if (batch.length < 1000) break;
			if (candles.length > 5000) break;
		}
		return candles.map((c) => ({
			open: c[1],
			high: c[2],
			low: c[3],
			close: c[4],
			volume: c[5],
			closeTime: c[0],
		}));
	}

	private runSimulation(candles: any[], tp: number, sl: number) {
		let balance = 1000;
		const betSize = 100;
		const leverage = 1;
		let wins = 0;
		let losses = 0;

		// CORREÇÃO 2: Definimos o tipo da posição ou null
		let position: { side: string; entryPrice: number } | null = null;

		for (let i = 200; i < candles.length; i++) {
			const currentCandle = candles[i];

			// 1. Verifica Saída
			if (position) {
				// TypeScript agora sabe que 'position' não é null aqui dentro
				const high = currentCandle.high;
				const low = currentCandle.low;
				let closed = false;
				let pnl = 0;

				if (position.side === "BUY_LONG") {
					// O erro sumiu aqui
					const tpPrice = position.entryPrice * (1 + tp);
					const slPrice = position.entryPrice * (1 - sl);
					if (high >= tpPrice) {
						pnl = tp;
						closed = true;
					} else if (low <= slPrice) {
						pnl = -sl;
						closed = true;
					}
				} else {
					const tpPrice = position.entryPrice * (1 - tp);
					const slPrice = position.entryPrice * (1 + sl);
					if (low <= tpPrice) {
						pnl = tp;
						closed = true;
					} else if (high >= slPrice) {
						pnl = -sl;
						closed = true;
					}
				}

				if (closed) {
					const profit = betSize * leverage * pnl;
					const fees = betSize * leverage * 0.0008;
					balance += profit - fees;

					if (profit > 0) wins++;
					else losses++;
					position = null;
				}
				continue;
			}

			// 2. Verifica Entrada
			const historySlice = candles.slice(0, i + 1);
			const analysis = this.strategyService.analyzeMarket(historySlice);

			if (analysis.action !== "NEUTRAL") {
				position = {
					side: analysis.action,
					entryPrice: currentCandle.close,
				};
			}
		}

		const totalTrades = wins + losses;
		return {
			profit: balance - 1000,
			winRate: totalTrades > 0 ? wins / totalTrades : 0,
			totalTrades,
		};
	}
}
