import { Module } from "@nestjs/common";
import { TradeScheduler } from "./trade.scheduler";
import { StrategyModule } from "../strategy/strategy.module";
import { EncryptionService } from "src/common/services/encryption.service";
import { BullModule } from "@nestjs/bullmq";
import { TradeProcessor } from "./trade.processor";
@Module({
	imports: [
		StrategyModule,
		BullModule.registerQueue({
			name: "trade-queue",
		}),
	],
	providers: [TradeScheduler, EncryptionService, TradeProcessor],
})
export class TradeModule {}
