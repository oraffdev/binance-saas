import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EncryptionService } from "./common/services/encryption.service";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
import { StrategyModule } from "./strategy/strategy.module";
import { TradeModule } from "./trade/trade.module";

@Module({
	imports: [
		ScheduleModule.forRoot(),
		StrategyModule,
		TradeModule,
		PrismaModule,
	],
	controllers: [AppController],
	providers: [AppService, PrismaService, EncryptionService],
})
export class AppModule {}
