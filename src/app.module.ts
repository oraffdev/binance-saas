import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { StrategyModule } from "./strategy/strategy.module";
import { TradeModule } from "./trade/trade.module";

@Module({
	imports: [ScheduleModule.forRoot(), StrategyModule, TradeModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
