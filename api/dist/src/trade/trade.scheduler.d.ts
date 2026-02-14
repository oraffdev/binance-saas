import { Queue } from "bullmq";
import { PrismaService } from "../prisma/prisma.service";
export declare class TradeScheduler {
    private readonly prisma;
    private tradeQueue;
    private optimizerQueue;
    private readonly logger;
    constructor(prisma: PrismaService, tradeQueue: Queue, optimizerQueue: Queue);
    handleM15(): Promise<void>;
    handleH1(): Promise<void>;
    handleH4(): Promise<void>;
    runOptimizer(): Promise<void>;
    private dispatchBots;
}
