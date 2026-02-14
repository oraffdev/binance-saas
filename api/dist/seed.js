"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const encryption_service_1 = require("./src/common/services/encryption.service");
const client_1 = require("./src/generated/client");
const prisma = new client_1.PrismaClient({
    adapter: new adapter_pg_1.PrismaPg({
        database: "trading_bot",
        user: "admin",
        password: "secure_password_123",
    }),
});
const encryption = new encryption_service_1.EncryptionService();
async function main() {
    console.log("🌱 Iniciando Seed...");
    const myApiKey = process.env.BINANCE_API_KEY;
    const mySecret = process.env.BINANCE_API_SECRET;
    if (!myApiKey || !mySecret) {
        throw new Error("❌ ERRO: BINANCE_API_KEY ou BINANCE_API_SECRET não encontrados no .env");
    }
    await prisma.trade.deleteMany();
    await prisma.bot.deleteMany();
    await prisma.user.deleteMany();
    console.log("🧹 Banco limpo.");
    console.log("👤 Criando usuário...");
    const user = await prisma.user.create({
        data: {
            email: "admin@teste.com",
            apiKey: encryption.encrypt(myApiKey),
            apiSecret: encryption.encrypt(mySecret),
            isActive: true,
        },
    });
    console.log("🤖 Criando Bot XRP...");
    await prisma.bot.create({
        data: {
            name: "XRP Scalper Fast",
            userId: user.id,
            symbol: "XRP/USDT",
            timeframe: client_1.Timeframe.M15,
            amount: 50,
            tp: 0.015,
            sl: 0.01,
            isActive: true,
        },
    });
    console.log("🤖 Criando Bot DUSK...");
    await prisma.bot.create({
        data: {
            name: "DUSK Scalper",
            userId: user.id,
            symbol: "DUSK/USDT",
            timeframe: client_1.Timeframe.M15,
            amount: 100,
            tp: 0.05,
            sl: 0.025,
            isActive: true,
        },
    });
    console.log("✅ Seed finalizado com sucesso!");
}
main()
    .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map