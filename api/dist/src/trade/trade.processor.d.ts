import { WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { PrismaService } from "../prisma/prisma.service";
import { EncryptionService } from "../common/services/encryption.service";
import { StrategyService } from "../strategy/strategy.service";
export declare class TradeProcessor extends WorkerHost {
    private readonly prisma;
    private readonly encryption;
    private readonly strategyService;
    private readonly logger;
    constructor(prisma: PrismaService, encryption: EncryptionService, strategyService: StrategyService);
    process(job: Job<{
        botId: string;
    }>): Promise<any>;
    private syncOpenTrade;
    private huntForTrades;
    private executeBracketTrade;
    private fetchCandles;
}
