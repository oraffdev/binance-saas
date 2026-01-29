import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { StrategyService } from "./modules/strategy/strategy.service";
import { ExchangeService } from "./modules/exchange/exchange.service";
import { TradingCronService } from "./modules/scheduler/trading-cron.service";

@Module({
	imports: [],
	controllers: [AppController],
	providers: [AppService, StrategyService, ExchangeService, TradingCronService],
})
export class AppModule {}
