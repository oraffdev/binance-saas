import { Controller, Post } from "@nestjs/common";
import { TradeScheduler } from "./trade.scheduler";

@Controller("trade")
export class TradeController {
	constructor(private readonly tradeScheduler: TradeScheduler) {}

	// Rota para forçar a otimização manualmente: POST /trade/force-optimize
	@Post("force-optimize")
	async forceOptimization() {
		console.log("🔘 Botão de pânico acionado: Forçando Otimização...");
		await this.tradeScheduler.runOptimizer();
		return { message: "Otimização disparada! Verifique os logs." };
	}
}
