import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule'; // Importe o CronExpression
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
import { Timeframe } from '@/generated/enums';

@Injectable()
export class TradeScheduler {
  private readonly logger = new Logger(TradeScheduler.name);

  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue('trade-queue') private tradeQueue: Queue,
  ) {}

  @Cron('0 */15 * * * *') // Aos minutos 0, 15, 30, 45
  async handleM15() {
    await this.dispatchBots(Timeframe.M15);
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleH1() {
    await this.dispatchBots(Timeframe.H1);
  }

  @Cron('0 0 */4 * * *') 
  async handleH4() {
    await this.dispatchBots(Timeframe.H4);
  }

  private async dispatchBots(timeframe: Timeframe) {
    this.logger.log(`⏰ Buscando bots do timeframe: ${timeframe}...`);
    const bots = await this.prisma.bot.findMany({
      where: {
        isActive: true,
        timeframe: timeframe,
        user: { isActive: true } // Join implícito
      },
      select: { id: true, name: true } // Pegamos ID do Bot, não do User
    });

    if (bots.length === 0) {
      this.logger.debug(`Nenhum bot ${timeframe} encontrado.`);
      return;
    }

    this.logger.log(`📦 Enfileirando ${bots.length} bots (${timeframe}) no Redis...`);

    for (const bot of bots) {
      await this.tradeQueue.add(
        'process-bot',
        { botId: bot.id }, 
        { removeOnComplete: true, attempts: 3 }
      );
    }
  }
}
