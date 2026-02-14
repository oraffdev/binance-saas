"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OptimizerProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizerProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const ccxt = __importStar(require("ccxt"));
const prisma_service_1 = require("../prisma/prisma.service");
const strategy_service_1 = require("../strategy/strategy.service");
const env_1 = require("../env");
let OptimizerProcessor = OptimizerProcessor_1 = class OptimizerProcessor extends bullmq_1.WorkerHost {
    prisma;
    strategyService;
    logger = new common_1.Logger(OptimizerProcessor_1.name);
    constructor(prisma, strategyService) {
        super();
        this.prisma = prisma;
        this.strategyService = strategyService;
    }
    async process(job) {
        const { symbol, timeframe } = job.data;
        this.logger.log(`🔧 Iniciando otimização Walk-Forward para ${symbol} - ${timeframe}...`);
        try {
            const exchange = new ccxt.binance({
                apiKey: env_1.ENV.BINANCE_API_KEY,
                secret: env_1.ENV.BINANCE_API_SECRET,
                options: { defaultType: "future" },
                enableRateLimit: true,
            });
            exchange.enableDemoTrading(true);
            const tfMap = { M15: "15m", H1: "1h", H4: "4h" };
            const ccxtTimeframe = tfMap[timeframe];
            const totalDaysToFetch = 180;
            const allCandles = await this.fetchHistoricalCandles(exchange, symbol, ccxtTimeframe, totalDaysToFetch);
            if (allCandles.length < 250) {
                this.logger.warn(`Dados insuficientes para ${symbol} (${allCandles.length} velas). Abortando.`);
                return;
            }
            const CANDLES_PER_DAY = {
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
            this.logger.log(`Total de velas: ${allCandles.length}. Treino: ${trainingCandles.length}, Validação: ${validationCandles.length}`);
            const bestConfigFromTraining = this.findBestParameters(trainingCandles);
            if (bestConfigFromTraining.score <= 0) {
                this.logger.warn(`[${symbol}] ⚠️ Nenhuma configuração lucrativa encontrada no período de TREINO. A otimização para por aqui.`);
                return;
            }
            const { config, profit, winRate, totalTrades } = bestConfigFromTraining;
            this.logger.log(`[${symbol}] 🏆 Configuração Ótima no TREINO:
   - Estratégia: ${config.useDynamicSLTP ? "Dinâmica (ATR)" : "Fixa (%)"}
   - Parâmetros: ${JSON.stringify(config)}
   - Desempenho no Treino: Lucro $${profit.toFixed(2)} | Win Rate ${(winRate * 100).toFixed(1)}% | Trades ${totalTrades}`);
            this.logger.log(`[${symbol}] 🧪 Validando a configuração ótima em ${validationCandles.length} velas não vistas...`);
            const validationResult = this.runSimulation(validationCandles, config);
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
            }
            else {
                this.logger.warn(`[${symbol}] ❌ FALHA NA VALIDAÇÃO.
   - Desempenho na Validação: Lucro $${validationResult.profit.toFixed(2)} | Win Rate ${(validationResult.winRate * 100).toFixed(1)}% | Trades ${validationResult.totalTrades}
   - A configuração ótima do treino não se provou robusta em dados futuros.
   - Nenhum bot será alterado.`);
            }
        }
        catch (error) {
            this.logger.error(`❌ CRASH NO WORKER: ${error.message}`, error.stack);
            throw error;
        }
    }
    findBestParameters(candles) {
        const fixedTpOptions = [0.01, 0.015, 0.02, 0.03, 0.04, 0.05, 0.06];
        const fixedSlOptions = [0.01, 0.015, 0.02, 0.025, 0.03];
        const atrMultiplierOptions = [1, 1.5, 2, 2.5, 3];
        const tpSlRatioOptions = [1, 1.5, 2, 2.5];
        let bestResult = {
            profit: -Infinity,
            winRate: 0,
            totalTrades: 0,
            config: { useDynamicSLTP: false },
            score: -Infinity,
        };
        this.logger.log("Buscando melhores parâmetros em modo TP/SL Fixo...");
        for (const tp of fixedTpOptions) {
            for (const sl of fixedSlOptions) {
                if (tp <= sl)
                    continue;
                const config = { useDynamicSLTP: false, tp, sl };
                const result = this.runSimulation(candles, config);
                const score = result.profit * (1 + result.winRate);
                if (score > bestResult.score) {
                    bestResult = { ...result, config, score };
                }
            }
        }
        this.logger.log("Buscando melhores parâmetros em modo TP/SL Dinâmico (ATR)...");
        for (const atrMultiplier of atrMultiplierOptions) {
            for (const tpSlRatio of tpSlRatioOptions) {
                const config = {
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
    runSimulation(candles, config) {
        let balance = 1000;
        const betSize = 100;
        let wins = 0;
        let losses = 0;
        let position = null;
        for (let i = 200; i < candles.length; i++) {
            const currentCandle = candles[i];
            if (position) {
                const high = currentCandle.high;
                const low = currentCandle.low;
                let closed = false;
                let pnlPct = 0;
                const isLong = position.side === "BUY_LONG";
                let tpPrice, slPrice;
                let tpPct, slPct;
                if (config.useDynamicSLTP &&
                    position.atrAtEntry &&
                    config.atrMultiplier &&
                    config.tpSlRatio) {
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
                }
                else if (!config.useDynamicSLTP && config.tp && config.sl) {
                    tpPct = config.tp;
                    slPct = config.sl;
                    tpPrice = isLong
                        ? position.entryPrice * (1 + tpPct)
                        : position.entryPrice * (1 - tpPct);
                    slPrice = isLong
                        ? position.entryPrice * (1 - slPct)
                        : position.entryPrice * (1 + slPct);
                }
                else {
                    continue;
                }
                const hitTP = isLong ? high >= tpPrice : low <= tpPrice;
                const hitSL = isLong ? low <= slPrice : high >= slPrice;
                if (hitSL) {
                    pnlPct = -slPct;
                    closed = true;
                }
                else if (hitTP) {
                    pnlPct = tpPct;
                    closed = true;
                }
                if (closed) {
                    const profit = betSize * pnlPct;
                    const fees = betSize * 0.0008;
                    balance += profit - fees;
                    if (profit > 0)
                        wins++;
                    else
                        losses++;
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
    async fetchHistoricalCandles(exchange, symbol, timeframe, days) {
        const since = exchange.milliseconds() - days * 24 * 60 * 60 * 1000;
        let candles = [];
        let fetchSince = since;
        while (true) {
            const batch = await exchange.fetchOHLCV(symbol, timeframe, fetchSince, 1000);
            if (!batch || batch.length === 0)
                break;
            candles = candles.concat(batch);
            fetchSince = batch[batch.length - 1][0] + 1;
            if (batch.length < 1000)
                break;
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
    configToDbData(config) {
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
};
exports.OptimizerProcessor = OptimizerProcessor;
exports.OptimizerProcessor = OptimizerProcessor = OptimizerProcessor_1 = __decorate([
    (0, bullmq_1.Processor)("optimizer-queue", {
        concurrency: 2,
        lockDuration: 3600000,
        lockRenewTime: 1800000,
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        strategy_service_1.StrategyService])
], OptimizerProcessor);
//# sourceMappingURL=optimizer.processor.js.map