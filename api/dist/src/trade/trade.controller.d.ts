import { TradeScheduler } from "./trade.scheduler";
export declare class TradeController {
    private readonly tradeScheduler;
    constructor(tradeScheduler: TradeScheduler);
    forceOptimization(): Promise<{
        message: string;
    }>;
}
