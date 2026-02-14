export interface CandleData {
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    closeTime: number;
}
export interface TradeSignal {
    action: "BUY_LONG" | "SELL_SHORT" | "NEUTRAL";
    reason: string;
    price: number;
}
export interface StrategyResult {
    action: "BUY_LONG" | "SELL_SHORT" | "NEUTRAL";
    reason: string;
    details: string;
    atr?: number;
}
export declare class StrategyService {
    private readonly RSI_LONG_THRESHOLD;
    private readonly RSI_SHORT_THRESHOLD;
    private readonly logger;
    analyzeMarket(candles: any[]): StrategyResult;
}
