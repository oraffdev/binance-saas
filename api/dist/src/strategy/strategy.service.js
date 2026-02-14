"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StrategyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyService = void 0;
const common_1 = require("@nestjs/common");
const technicalindicators_1 = require("technicalindicators");
let StrategyService = StrategyService_1 = class StrategyService {
    RSI_LONG_THRESHOLD = 35;
    RSI_SHORT_THRESHOLD = 65;
    logger = new common_1.Logger(StrategyService_1.name);
    analyzeMarket(candles) {
        if (candles.length < 200) {
            return {
                action: "NEUTRAL",
                reason: "Dados insuficientes",
                details: `Candles: ${candles.length}/200`,
            };
        }
        const closes = candles.map((c) => c.close);
        const highs = candles.map((c) => c.high);
        const lows = candles.map((c) => c.low);
        const currentPrice = closes[closes.length - 1];
        const rsiValues = technicalindicators_1.RSI.calculate({
            values: closes,
            period: 14,
        });
        const rsi = rsiValues[rsiValues.length - 1];
        const emaValues = technicalindicators_1.EMA.calculate({
            values: closes,
            period: 200,
        });
        const ema = emaValues[emaValues.length - 1];
        const atrValues = technicalindicators_1.ATR.calculate({
            high: highs,
            low: lows,
            close: closes,
            period: 14,
        });
        const atr = atrValues[atrValues.length - 1];
        const rsiFmt = rsi.toFixed(2);
        const priceFmt = currentPrice.toFixed(4);
        const emaFmt = ema.toFixed(4);
        const atrFmt = atr.toFixed(4);
        const details = `Preço: ${priceFmt} | EMA200: ${emaFmt} | RSI: ${rsiFmt} | ATR: ${atrFmt}`;
        if (currentPrice > ema) {
            if (rsi < this.RSI_LONG_THRESHOLD) {
                return {
                    action: "BUY_LONG",
                    reason: "Tendência de Alta confirmada + RSI Sobrevendido",
                    details,
                    atr,
                };
            }
            else {
                return {
                    action: "NEUTRAL",
                    reason: `Tendência de Alta (OK), mas RSI ${rsiFmt} ainda não está baixo o suficiente (< ${this.RSI_LONG_THRESHOLD})`,
                    details,
                    atr,
                };
            }
        }
        else if (currentPrice < ema) {
            if (rsi > this.RSI_SHORT_THRESHOLD) {
                return {
                    action: "SELL_SHORT",
                    reason: "Tendência de Baixa confirmada + RSI Sobrecomprado",
                    details,
                    atr,
                };
            }
            else {
                return {
                    action: "NEUTRAL",
                    reason: `Tendência de Baixa (OK), mas RSI ${rsiFmt} ainda não está alto o suficiente (> ${this.RSI_SHORT_THRESHOLD})`,
                    details,
                    atr,
                };
            }
        }
        return { action: "NEUTRAL", reason: "Indefinido", details, atr };
    }
};
exports.StrategyService = StrategyService;
exports.StrategyService = StrategyService = StrategyService_1 = __decorate([
    (0, common_1.Injectable)()
], StrategyService);
//# sourceMappingURL=strategy.service.js.map