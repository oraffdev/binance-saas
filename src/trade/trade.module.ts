import { Module } from "@nestjs/common";
import { TradeScheduler } from "./trade.scheduler";
import { StrategyModule } from "../strategy/strategy.module";
import { EncryptionService } from "src/common/services/encryption.service";

@Module({
	imports: [StrategyModule],
	providers: [TradeScheduler, EncryptionService],
})
export class TradeModule {}
