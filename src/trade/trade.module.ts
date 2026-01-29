import { Module } from '@nestjs/common';
import { TradeScheduler } from './trade.scheduler';
import { StrategyModule } from '../strategy/strategy.module';

@Module({
  imports: [StrategyModule],
  providers: [TradeScheduler],
})
export class TradeModule {}
