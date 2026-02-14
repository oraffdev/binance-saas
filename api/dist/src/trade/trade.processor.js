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
var TradeProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const encryption_service_1 = require("../common/services/encryption.service");
const strategy_service_1 = require("../strategy/strategy.service");
const ccxt = __importStar(require("ccxt"));
let TradeProcessor = TradeProcessor_1 = class TradeProcessor extends bullmq_1.WorkerHost {
    prisma;
    encryption;
    strategyService;
    logger = new common_1.Logger(TradeProcessor_1.name);
    constructor(prisma, encryption, strategyService) {
        super();
        this.prisma = prisma;
        this.encryption = encryption;
        this.strategyService = strategyService;
    }
    async process(job) {
        const { botId } = job.data;
        try {
            const bot = await this.prisma.bot.findUnique({
                where: { id: botId },
                include: { user: true },
            });
            if (!bot || !bot.isActive || !bot.user.isActive) {
                return;
            }
            this.logger.debug(`🤖 Processando Bot: ${bot.name} (${bot.symbol}) | TF: ${bot.timeframe}`);
            const apiKey = this.encryption.decrypt(bot.user.apiKey);
            const secret = this.encryption.decrypt(bot.user.apiSecret);
            const exchange = new ccxt.binance({
                apiKey: apiKey,
                secret: secret,
                options: { defaultType: "future" },
                enableRateLimit: true,
            });
            exchange.enableDemoTrading(true);
            await exchange.loadMarkets();
            const openTrade = await this.prisma.trade.findFirst({
                where: { botId: bot.id, status: "OPEN" },
            });
            if (openTrade) {
                await this.syncOpenTrade(exchange, openTrade, bot.user.email);
            }
            else {
                await this.huntForTrades(exchange, bot);
            }
        }
        catch (error) {
            this.logger.error(`❌ Falha no Bot ${botId}: ${error.message}`);
        }
    }
    async syncOpenTrade(exchange, trade, userEmail) {
        try {
            const positions = await exchange.fetchPositions([trade.symbol]);
            const position = positions.find((p) => p.symbol === trade.symbol);
            const isClosedOnBinance = !position || Number(position.contracts) === 0;
            if (isClosedOnBinance) {
                this.logger.log(`🕵️ Bot ${trade.symbol}: Posição fechada na Binance. Atualizando banco...`);
                try {
                    await exchange.cancelAllOrders(trade.symbol);
                }
                catch (e) {
                }
                const ticker = await exchange.fetchTicker(trade.symbol);
                const exitPrice = ticker.last || 0;
                let pnl = 0;
                if (exitPrice > 0) {
                    if (trade.side === "BUY_LONG") {
                        pnl = (exitPrice - trade.entryPrice) * trade.amount;
                    }
                    else {
                        pnl = (trade.entryPrice - exitPrice) * trade.amount;
                    }
                }
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
            }
            else {
                this.logger.debug(`🛡️ Posição ainda aberta para ${trade.symbol}. Monitorando...`);
            }
        }
        catch (error) {
            this.logger.error(`Erro ao sincronizar trade ${trade.id}: ${error.message}`);
        }
    }
    async huntForTrades(exchange, bot) {
        const tfMap = { M15: "15m", H1: "1h", H4: "4h" };
        const ccxtTimeframe = tfMap[bot.timeframe];
        if (!ccxtTimeframe)
            return;
        const candles = await this.fetchCandles(exchange, bot.symbol, ccxtTimeframe);
        const analysis = this.strategyService.analyzeMarket(candles);
        if (analysis.action !== "NEUTRAL") {
            const lastCandle = candles[candles.length - 1];
            if (!lastCandle || !lastCandle.close) {
                this.logger.warn("Sinal ignorado: Dados de preço incompletos.");
                return;
            }
            const currentPrice = lastCandle.close;
            this.logger.log(`🚀 SINAL ${analysis.action} | Motivo: ${analysis.reason} | ${analysis.details}`);
            await this.executeBracketTrade(exchange, bot, analysis, currentPrice);
        }
        else {
            this.logger.debug(`💤 ${bot.name} (Wait): ${analysis.reason}`);
        }
    }
    async executeBracketTrade(exchange, bot, analysis, price) {
        const { action: side } = analysis;
        if (side === "NEUTRAL")
            return;
        const binanceSide = side === "BUY_LONG" ? "buy" : "sell";
        const exitSide = side === "BUY_LONG" ? "sell" : "buy";
        const { amount: AMOUNT } = bot;
        let tpPrice = 0;
        let slPrice = 0;
        if (bot.useDynamicSLTP &&
            bot.atrMultiplier &&
            bot.tpSlRatio &&
            analysis.atr) {
            this.logger.log(`🤖 Usando modo de saída Dinâmico (ATR) para ${bot.name}`);
            const slDistance = analysis.atr * bot.atrMultiplier;
            const tpDistance = slDistance * bot.tpSlRatio;
            if (side === "BUY_LONG") {
                slPrice = price - slDistance;
                tpPrice = price + tpDistance;
            }
            else {
                slPrice = price + slDistance;
                tpPrice = price - tpDistance;
            }
        }
        else {
            this.logger.log(`🤖 Usando modo de saída Fixo (%) para ${bot.name}`);
            const { tp: TAKE_PROFIT_PCT, sl: STOP_LOSS_PCT } = bot;
            if (side === "BUY_LONG") {
                tpPrice = price * (1 + TAKE_PROFIT_PCT);
                slPrice = price * (1 - STOP_LOSS_PCT);
            }
            else {
                tpPrice = price * (1 - TAKE_PROFIT_PCT);
                slPrice = price * (1 + STOP_LOSS_PCT);
            }
        }
        const tpFmt = Number(exchange.priceToPrecision(bot.symbol, tpPrice));
        const slFmt = Number(exchange.priceToPrecision(bot.symbol, slPrice));
        try {
            this.logger.log(`🎯 Enviando Ordens ${bot.symbol} | Entrada: ~${price} | TP: ${tpFmt} | SL: ${slFmt}`);
            const order = await exchange.createOrder(bot.symbol, "market", binanceSide, AMOUNT);
            const entryPriceReal = order.price || price;
            await exchange.createOrder(bot.symbol, "TAKE_PROFIT_MARKET", exitSide, AMOUNT, undefined, {
                stopPrice: tpFmt,
                reduceOnly: true,
            });
            await exchange.createOrder(bot.symbol, "STOP_MARKET", exitSide, AMOUNT, undefined, {
                stopPrice: slFmt,
                reduceOnly: true,
            });
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
        }
        catch (error) {
            this.logger.error(`❌ Erro ao executar trade: ${error.message}`);
        }
    }
    async fetchCandles(exchange, symbol, timeframe) {
        const ohlcv = await exchange.fetchOHLCV(symbol, timeframe, undefined, 200);
        return ohlcv.map((c) => ({
            open: c[1],
            high: c[2],
            low: c[3],
            close: c[4],
            volume: c[5],
            closeTime: c[0],
        }));
    }
};
exports.TradeProcessor = TradeProcessor;
exports.TradeProcessor = TradeProcessor = TradeProcessor_1 = __decorate([
    (0, bullmq_1.Processor)("trade-queue", {
        concurrency: 10,
        lockDuration: 300000,
        lockRenewTime: 120000,
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        encryption_service_1.EncryptionService,
        strategy_service_1.StrategyService])
], TradeProcessor);
//# sourceMappingURL=trade.processor.js.map