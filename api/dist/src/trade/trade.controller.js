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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeController = void 0;
const common_1 = require("@nestjs/common");
const trade_scheduler_1 = require("./trade.scheduler");
let TradeController = class TradeController {
    tradeScheduler;
    constructor(tradeScheduler) {
        this.tradeScheduler = tradeScheduler;
    }
    async forceOptimization() {
        console.log("🔘 Botão de pânico acionado: Forçando Otimização...");
        await this.tradeScheduler.runOptimizer();
        return { message: "Otimização disparada! Verifique os logs." };
    }
};
exports.TradeController = TradeController;
__decorate([
    (0, common_1.Post)("force-optimize"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "forceOptimization", null);
exports.TradeController = TradeController = __decorate([
    (0, common_1.Controller)("trade"),
    __metadata("design:paramtypes", [trade_scheduler_1.TradeScheduler])
], TradeController);
//# sourceMappingURL=trade.controller.js.map