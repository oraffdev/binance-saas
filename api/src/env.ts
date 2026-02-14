import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
	PORT: z.coerce.number().default(3000),
	BINANCE_API_KEY: z.coerce.string(),
	BINANCE_API_SECRET: z.coerce.string(),
	DATABASE_URL: z.coerce.string(),
	ENCRYPTION_KEY: z.coerce.string().min(32).max(32), // use "openssl rand -hex 16" to generate the key with 32-char encoded string
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	console.error("Invalid environment variables", _env.error.format());

	throw new Error("Invalid environment variables");
}

export const ENV = _env.data;
