import "dotenv/config"; // Garante que lê o .env
import { PrismaPg } from "@prisma/adapter-pg";
import { EncryptionService } from "./src/common/services/encryption.service";
import { PrismaClient, Timeframe } from "@/generated/client";

// --- INSTÂNCIAS ---
// Passamos a URL explicitamente para evitar erros de inicialização
const prisma = new PrismaClient({
	adapter: new PrismaPg({
		database: "trading_bot",
		user: "admin",
		password: "secure_password_123",
	}),
});

// Instanciamos o Encryption passando o Mock
const encryption = new EncryptionService();
async function main() {
	console.log("🌱 Iniciando Seed...");

	const myApiKey = process.env.BINANCE_API_KEY;
	const mySecret = process.env.BINANCE_API_SECRET;

	if (!myApiKey || !mySecret) {
		throw new Error(
			"❌ ERRO: BINANCE_API_KEY ou BINANCE_API_SECRET não encontrados no .env",
		);
	}

	// 1. Limpeza (Opcional: evita erro de duplicidade se rodar 2x)
	// Apagamos trades e bots primeiro por causa das Foreign Keys
	await prisma.trade.deleteMany();
	await prisma.bot.deleteMany();
	await prisma.user.deleteMany();
	console.log("🧹 Banco limpo.");

	// 2. Cria Usuário
	console.log("👤 Criando usuário...");
	const user = await prisma.user.create({
		data: {
			email: "admin@teste.com",
			apiKey: encryption.encrypt(myApiKey),
			apiSecret: encryption.encrypt(mySecret),
			isActive: true,
		},
	});

	// 3. Cria Bot 1 (Scalper de XRP - 15 min)
	console.log("🤖 Criando Bot XRP...");
	await prisma.bot.create({
		data: {
			name: "XRP Scalper Fast",
			userId: user.id,
			symbol: "XRP/USDT",
			timeframe: Timeframe.M15, // Agora o Enum funciona
			amount: 50,
			tp: 0.015,
			sl: 0.01,
			isActive: true,
		},
	});

	// 4. Cria Bot 2 (Swing de SOL - 1 hora)
	console.log("🤖 Criando Bot SOL...");
	await prisma.bot.create({
		data: {
			name: "SOL Swing Trade",
			userId: user.id,
			symbol: "SOL/USDT",
			timeframe: Timeframe.H1,
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
