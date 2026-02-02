// seed.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./src/app.module";
import { PrismaService } from "./src/prisma/prisma.service";
import { EncryptionService } from "./src/common/services/encryption.service";

async function bootstrap() {
	const app = await NestFactory.createApplicationContext(AppModule);
	const prisma = app.get(PrismaService);
	const encryption = app.get(EncryptionService); // Agora funciona pois está no TradeModule ou Global

	// COLOQUE SUAS CHAVES TESTNET AQUI
	const myApiKey = process.env.BINANCE_API_KEY as string;
	const mySecret = process.env.BINANCE_API_SECRET as string;

	await prisma.user.create({
		data: {
			email: "admin@teste.com",
			apiKey: encryption.encrypt(myApiKey),
			apiSecret: encryption.encrypt(mySecret),
			isActive: true,
		},
	});

	console.log("✅ Usuário Seed criado com sucesso!");
	await app.close();
}
bootstrap();
