import { Module } from "@nestjs/common";
import { TradeScheduler } from "./trade.scheduler";
import { StrategyModule } from "../strategy/strategy.module";
import { EncryptionService } from "src/common/services/encryption.service";
import { BullModule } from "@nestjs/bullmq";
import { TradeProcessor } from "./trade.processor";
import { OptimizerProcessor } from "@/optimizer/optimizer.processor";
import { TradeController } from './trade.controller';
@Module({
	imports: [
		StrategyModule,
		BullModule.registerQueue({
			name: "trade-queue",
		}),
		BullModule.registerQueue({
			name: "optimizer-queue",
		}),
	],
	providers: [
		TradeScheduler,
		EncryptionService,
		TradeProcessor,
		OptimizerProcessor,
	],
	controllers: [TradeController],
})
export class TradeModule {}
