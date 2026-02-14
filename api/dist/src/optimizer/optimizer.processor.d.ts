import { WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { PrismaService } from "../prisma/prisma.service";
import { StrategyService } from "../strategy/strategy.service";
import { EnumTimeframeFilter } from "@/generated/commonInputTypes";
export declare class OptimizerProcessor extends WorkerHost {
    private readonly prisma;
    private readonly strategyService;
    private readonly logger;
    constructor(prisma: PrismaService, strategyService: StrategyService);
    process(job: Job<{
        symbol: string;
        timeframe: EnumTimeframeFilter;
    }>): Promise<void>;
    private findBestParameters;
    private runSimulation;
    private fetchHistoricalCandles;
    private configToDbData;
}
