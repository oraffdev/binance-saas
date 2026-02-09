import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import * as ccxt from "ccxt";
import { PrismaService } from "../prisma/prisma.service";
import { StrategyService, CandleData } from "../strategy/strategy.service";
import { ENV } from "@/env";
import { EnumTimeframeFilter } from "@/generated/commonInputTypes";

// --- Tipos para Otimização ---
type SimulationConfig = {
	useDynamicSLTP: boolean;
	tp?: number;
	sl?: number;
	atrMultiplier?: number;
	tpSlRatio?: number;
};

type SimulationResult = {
	profit: number;
	winRate: number;
	totalTrades: number;
	config: SimulationConfig;
	score: number;
};

@Processor("optimizer-queue", {
	concurrency: 1, // Otimização é pesada, 1 por vez para não sobrecarregar
	lockDuration: 3600000,
	lockRenewTime: 1800000,
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
		const { symbol, timeframe } = job.data;
		this.logger.log(
			`🔧 Iniciando otimização Walk-Forward para ${symbol} - ${timeframe}...`,
		);

		try {
			// 1. Setup da Exchange
			const exchange = new ccxt.binance({
				apiKey: ENV.BINANCE_API_KEY,
				secret: ENV.BINANCE_API_SECRET,
				options: { defaultType: "future" },
				enableRateLimit: true,
			});

			// 2. Download de um histórico de dados mais leve (6 meses)
			const tfMap: Record<string, string> = { M15: "15m", H1: "1h", H4: "4h" };
			const ccxtTimeframe = tfMap[timeframe as string];
			const totalDaysToFetch = 180;
			const allCandles = await this.fetchHistoricalCandles(
				exchange,
				symbol,
				ccxtTimeframe,
				totalDaysToFetch,
			);

			if (allCandles.length < 250) {
				// Mínimo para EMA200 + período de validação
				this.logger.warn(
					`Dados insuficientes para ${symbol} (${allCandles.length} velas). Abortando.`,
				);
				return;
			}

			// 3. Divisão Walk-Forward: Treino (~4 meses) e Validação (2 meses)
			const CANDLES_PER_DAY: Record<string, number> = {
				"15m": 96,
				"1h": 24,
				"4h": 6,
			};
			const candlesPerDay = CANDLES_PER_DAY[ccxtTimeframe] || 24;
			const validationDays = 60;
			const validationCandleCount = validationDays * candlesPerDay;

			const splitIndex = Math.max(0, allCandles.length - validationCandleCount);
			const trainingCandles = allCandles.slice(0, splitIndex);
			const validationCandles = allCandles.slice(splitIndex);

			this.logger.log(
				`Total de velas: ${allCandles.length}. Treino: ${trainingCandles.length}, Validação: ${validationCandles.length}`,
			);

			// 4. Grid Search: Encontrar os melhores parâmetros usando SOMENTE os dados de treino
			const bestConfigFromTraining = this.findBestParameters(trainingCandles);

			if (bestConfigFromTraining.score <= 0) {
				this.logger.warn(
					`[${symbol}] ⚠️ Nenhuma configuração lucrativa encontrada no período de TREINO. A otimização para por aqui.`,
				);
				return;
			}

			const { config, profit, winRate, totalTrades } = bestConfigFromTraining;
			this.logger.log(`[${symbol}] 🏆 Configuração Ótima no TREINO:
   - Estratégia: ${config.useDynamicSLTP ? "Dinâmica (ATR)" : "Fixa (%)"}
   - Parâmetros: ${JSON.stringify(config)}
   - Desempenho no Treino: Lucro $${profit.toFixed(2)} | Win Rate ${(winRate * 100).toFixed(1)}% | Trades ${totalTrades}`);

			// 5. Validação: Testar a melhor configuração nos dados NÃO VISTOS (futuro)
			this.logger.log(
				`[${symbol}] 🧪 Validando a configuração ótima em ${validationCandles.length} velas não vistas...`,
			);
			const validationResult = this.runSimulation(validationCandles, config);

			// 6. Atualização Segura: Só atualiza o bot se a estratégia for lucrativa na validação
			if (validationResult.profit > 0) {
				const dbData = this.configToDbData(config);
				const updateResult = await this.prisma.bot.updateMany({
					where: { symbol, timeframe, autoTune: true },
					data: { ...dbData, lastTunedAt: new Date() },
				});

				this.logger.log(`[${symbol}] ✅ SUCESSO NA VALIDAÇÃO!
   - Desempenho na Validação: Lucro $${validationResult.profit.toFixed(2)} | Win Rate ${(validationResult.winRate * 100).toFixed(1)}% | Trades ${validationResult.totalTrades}
   - Novos Parâmetros: ${JSON.stringify(dbData)}
   - ${updateResult.count} bots foram atualizados com sucesso!`);
			} else {
				this.logger.warn(`[${symbol}] ❌ FALHA NA VALIDAÇÃO.
   - Desempenho na Validação: Lucro $${validationResult.profit.toFixed(2)} | Win Rate ${(validationResult.winRate * 100).toFixed(1)}% | Trades ${validationResult.totalTrades}
   - A configuração ótima do treino não se provou robusta em dados futuros.
   - Nenhum bot será alterado.`);
			}
		} catch (error) {
			this.logger.error(`❌ CRASH NO WORKER: ${error.message}`, error.stack);
			throw error;
		}
	}

	private findBestParameters(candles: CandleData[]): SimulationResult {
		// Espaço de busca de parâmetros
		const fixedTpOptions = [0.01, 0.015, 0.02, 0.03, 0.04, 0.05, 0.06];
		const fixedSlOptions = [0.01, 0.015, 0.02, 0.025, 0.03];
		const atrMultiplierOptions = [1, 1.5, 2, 2.5, 3];
		const tpSlRatioOptions = [1, 1.5, 2, 2.5];

		let bestResult: SimulationResult = {
			profit: -Infinity,
			winRate: 0,
			totalTrades: 0,
			config: { useDynamicSLTP: false },
			score: -Infinity,
		};

		this.logger.log("Buscando melhores parâmetros em modo TP/SL Fixo...");
		// Grid Search para TP/SL Fixo
		for (const tp of fixedTpOptions) {
			for (const sl of fixedSlOptions) {
				if (tp <= sl) continue;
				const config: SimulationConfig = { useDynamicSLTP: false, tp, sl };
				const result = this.runSimulation(candles, config);
				const score = result.profit * (1 + result.winRate); // Fator de WinRate para desempate
				if (score > bestResult.score) {
					bestResult = { ...result, config, score };
				}
			}
		}

		this.logger.log(
			"Buscando melhores parâmetros em modo TP/SL Dinâmico (ATR)...",
		);
		// Grid Search para TP/SL Dinâmico
		for (const atrMultiplier of atrMultiplierOptions) {
			for (const tpSlRatio of tpSlRatioOptions) {
				const config: SimulationConfig = {
					useDynamicSLTP: true,
					atrMultiplier,
					tpSlRatio,
				};
				const result = this.runSimulation(candles, config);
				const score = result.profit * (1 + result.winRate);
				if (score > bestResult.score) {
					bestResult = { ...result, config, score };
				}
			}
		}

		return bestResult;
	}

	private runSimulation(candles: CandleData[], config: SimulationConfig) {
		let balance = 1000;
		const betSize = 100;
		let wins = 0;
		let losses = 0;
		let position: {
			side: string;
			entryPrice: number;
			atrAtEntry?: number;
		} | null = null;

		for (let i = 200; i < candles.length; i++) {
			const currentCandle = candles[i];

			if (position) {
				const high = currentCandle.high;
				const low = currentCandle.low;
				let closed = false;
				let pnlPct = 0;

				const isLong = position.side === "BUY_LONG";
				let tpPrice: number, slPrice: number;
				let tpPct: number, slPct: number;

				if (
					config.useDynamicSLTP &&
					position.atrAtEntry &&
					config.atrMultiplier &&
					config.tpSlRatio
				) {
					const slDistance = position.atrAtEntry * config.atrMultiplier;
					const tpDistance = slDistance * config.tpSlRatio;
					slPct = slDistance / position.entryPrice;
					tpPct = tpDistance / position.entryPrice;
					slPrice = isLong
						? position.entryPrice - slDistance
						: position.entryPrice + slDistance;
					tpPrice = isLong
						? position.entryPrice + tpDistance
						: position.entryPrice - tpDistance;
				} else if (!config.useDynamicSLTP && config.tp && config.sl) {
					tpPct = config.tp;
					slPct = config.sl;
					tpPrice = isLong
						? position.entryPrice * (1 + tpPct)
						: position.entryPrice * (1 - tpPct);
					slPrice = isLong
						? position.entryPrice * (1 - slPct)
						: position.entryPrice * (1 + slPct);
				} else {
					continue; // Configuração inválida, pula a iteração
				}

				const hitTP = isLong ? high >= tpPrice : low <= tpPrice;
				const hitSL = isLong ? low <= slPrice : high >= slPrice;

				// Aqui simplificamos a lógica de conflito do backtest.ts para velocidade.
				// Para otimização, assumir o pior caso (SL) é aceitável.
				if (hitSL) {
					pnlPct = -slPct;
					closed = true;
				} else if (hitTP) {
					pnlPct = tpPct;
					closed = true;
				}

				if (closed) {
					const profit = betSize * pnlPct;
					const fees = betSize * 0.0008;
					balance += profit - fees;
					if (profit > 0) wins++;
					else losses++;
					position = null;
				}
				continue;
			}

			const historySlice = candles.slice(0, i + 1);
			const analysis = this.strategyService.analyzeMarket(historySlice);

			if (analysis.action !== "NEUTRAL") {
				position = {
					side: analysis.action,
					entryPrice: currentCandle.close,
					atrAtEntry: analysis.atr,
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

	private async fetchHistoricalCandles(
		exchange: ccxt.Exchange,
		symbol: string,
		timeframe: string,
		days: number,
	): Promise<CandleData[]> {
		const since = exchange.milliseconds() - days * 24 * 60 * 60 * 1000;
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
			fetchSince = batch[batch.length - 1][0] + 1;
			if (batch.length < 1000) break;
		}

		return candles
			.map((c) => ({
				open: c[1],
				high: c[2],
				low: c[3],
				close: c[4],
				volume: c[5],
				closeTime: c[0],
			}))
			.sort((a, b) => a.closeTime - b.closeTime);
	}

	private configToDbData(config: SimulationConfig) {
		if (config.useDynamicSLTP) {
			return {
				useDynamicSLTP: true,
				atrMultiplier: config.atrMultiplier,
				tpSlRatio: config.tpSlRatio,
			};
		}
		return {
			useDynamicSLTP: false,
			tp: config.tp,
			sl: config.sl,
		};
	}
}
