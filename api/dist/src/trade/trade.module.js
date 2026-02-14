"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeModule = void 0;
const common_1 = require("@nestjs/common");
const trade_scheduler_1 = require("./trade.scheduler");
const strategy_module_1 = require("../strategy/strategy.module");
const encryption_service_1 = require("../common/services/encryption.service");
const bullmq_1 = require("@nestjs/bullmq");
const trade_processor_1 = require("./trade.processor");
const optimizer_processor_1 = require("../optimizer/optimizer.processor");
const trade_controller_1 = require("./trade.controller");
let TradeModule = class TradeModule {
};
exports.TradeModule = TradeModule;
exports.TradeModule = TradeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            strategy_module_1.StrategyModule,
            bullmq_1.BullModule.registerQueue({
                name: "trade-queue",
            }),
            bullmq_1.BullModule.registerQueue({
                name: "optimizer-queue",
            }),
        ],
        providers: [
            trade_scheduler_1.TradeScheduler,
            encryption_service_1.EncryptionService,
            trade_processor_1.TradeProcessor,
            optimizer_processor_1.OptimizerProcessor,
        ],
        controllers: [trade_controller_1.TradeController],
    })
], TradeModule);
//# sourceMappingURL=trade.module.js.map