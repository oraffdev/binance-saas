"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TradeScheduler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeScheduler = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const prisma_service_1 = require("../prisma/prisma.service");
const enums_1 = require("../generated/enums");
let TradeScheduler = TradeScheduler_1 = class TradeScheduler {
    prisma;
    tradeQueue;
    optimizerQueue;
    logger = new common_1.Logger(TradeScheduler_1.name);
    constructor(prisma, tradeQueue, optimizerQueue) {
        this.prisma = prisma;
        this.tradeQueue = tradeQueue;
        this.optimizerQueue = optimizerQueue;
    }
    async handleM15() {
        await this.dispatchBots(enums_1.Timeframe.M15);
    }
    async handleH1() {
        await this.dispatchBots(enums_1.Timeframe.H1);
    }
    async handleH4() {
        await this.dispatchBots(enums_1.Timeframe.H4);
    }
    async runOptimizer() {
        this.logger.log("🕵️ Iniciando varredura para Auto-Tune...");
        const uniqueBots = await this.prisma.bot.groupBy({
            by: ["symbol", "timeframe"],
            where: { isActive: true, autoTune: true },
        });
        this.logger.warn(uniqueBots);
        this.logger.log(`📦 Enfileirando ${uniqueBots.length} grupos para otimização.`);
        for (const bot of uniqueBots) {
            const jobId = `opt-${bot.symbol}-${bot.timeframe}-${Date.now()}`;
            await this.optimizerQueue.add("optimize-bot", { symbol: bot.symbol, timeframe: bot.timeframe }, {
                jobId: jobId,
                removeOnComplete: true,
                attempts: 3,
            });
        }
    }
    async dispatchBots(timeframe) {
        this.logger.log(`⏰ Buscando bots do timeframe: ${timeframe}...`);
        const bots = await this.prisma.bot.findMany({
            where: {
                isActive: true,
                timeframe: timeframe,
                user: { isActive: true },
            },
            select: { id: true, name: true },
        });
        if (bots.length === 0) {
            this.logger.debug(`Nenhum bot ${timeframe} encontrado.`);
            return;
        }
        this.logger.log(`📦 Enfileirando ${bots.length} bots (${timeframe}) no Redis...`);
        for (const bot of bots) {
            await this.tradeQueue.add("process-bot", { botId: bot.id }, { removeOnComplete: true, attempts: 3 });
        }
    }
};
exports.TradeScheduler = TradeScheduler;
__decorate([
    (0, schedule_1.Cron)("0 */15 * * * *"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TradeScheduler.prototype, "handleM15", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TradeScheduler.prototype, "handleH1", null);
__decorate([
    (0, schedule_1.Cron)("0 0 */4 * * *"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TradeScheduler.prototype, "handleH4", null);
__decorate([
    (0, schedule_1.Cron)("0 2 * * 6"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TradeScheduler.prototype, "runOptimizer", null);
exports.TradeScheduler = TradeScheduler = TradeScheduler_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, bullmq_1.InjectQueue)("trade-queue")),
    __param(2, (0, bullmq_1.InjectQueue)("optimizer-queue")),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        bullmq_2.Queue,
        bullmq_2.Queue])
], TradeScheduler);
//# sourceMappingURL=trade.scheduler.js.map