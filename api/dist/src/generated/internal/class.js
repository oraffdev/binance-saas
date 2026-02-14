"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.3.0",
    "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider     = \"prisma-client\"\n  output       = \"../src/generated\"\n  moduleFormat = \"cjs\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\n// Adicione este Enum para travar os timeframes permitidos\nenum Timeframe {\n  M15 // 15 minutos\n  H1 // 1 hora\n  H4 // 4 horas\n}\n\nmodel User {\n  id        String  @id @default(uuid())\n  email     String  @unique\n  apiKey    String\n  apiSecret String\n  isActive  Boolean @default(true)\n\n  bots      Bot[]    @relation(\"UserBots\") // Um usuário tem muitos bots\n  createdAt DateTime @default(now())\n}\n\nmodel Bot {\n  id        String    @id @default(uuid())\n  name      String // Ex: \"Estratégia Agressiva XRP\"\n  symbol    String // Ex: \"XRP/USDT\"\n  timeframe Timeframe // Ex: M15, H1\n\n  amount Float @default(1) // Quanto apostar em USDT\n  tp     Float @default(0) // Take Profit (ex: 0.015 para 1.5%) - Opcional\n  sl     Float @default(0) // Stop Loss (ex: 0.01 para 1%) - Opcional\n\n  // --- Configs de Saída Dinâmica (ATR) ---\n  useDynamicSLTP Boolean @default(false)\n  atrMultiplier  Float? // Ex: 2 (SL = 2 * ATR)\n  tpSlRatio      Float? // Ex: 1.5 (TP = 1.5 * SL)\n\n  isActive Boolean @default(true)\n\n  autoTune         Boolean   @default(false) // Usuário quer otimização automática?\n  lastTunedAt      DateTime? // Quando foi a última vez que otimizamos?\n  tuneLookbackDays Int       @default(15)\n\n  userId String\n  user   User   @relation(\"UserBots\", fields: [userId], references: [id])\n\n  trades Trade[] @relation(\"BotTrades\") // Um bot faz muitos trades\n}\n\nmodel Trade {\n  id    String @id @default(uuid())\n  botId String\n  bot   Bot    @relation(\"BotTrades\", fields: [botId], references: [id])\n\n  symbol     String\n  status     String // OPEN, CLOSED\n  side       String // BUY_LONG, SELL_SHORT\n  amount     Float\n  entryPrice Float\n  exitPrice  Float?\n  pnl        Float?\n  exitReason String?\n\n  createdAt DateTime  @default(now())\n  closedAt  DateTime?\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"apiKey\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"apiSecret\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isActive\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"bots\",\"kind\":\"object\",\"type\":\"Bot\",\"relationName\":\"UserBots\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Bot\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"symbol\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"timeframe\",\"kind\":\"enum\",\"type\":\"Timeframe\"},{\"name\":\"amount\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"tp\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"sl\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"useDynamicSLTP\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"atrMultiplier\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"tpSlRatio\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"isActive\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"autoTune\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"lastTunedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"tuneLookbackDays\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserBots\"},{\"name\":\"trades\",\"kind\":\"object\",\"type\":\"Trade\",\"relationName\":\"BotTrades\"}],\"dbName\":null},\"Trade\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"botId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"bot\",\"kind\":\"object\",\"type\":\"Bot\",\"relationName\":\"BotTrades\"},{\"name\":\"symbol\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"side\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"amount\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"entryPrice\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"exitPrice\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"pnl\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"exitReason\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"closedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map