"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(3000),
    BINANCE_API_KEY: zod_1.z.coerce.string(),
    BINANCE_API_SECRET: zod_1.z.coerce.string(),
    DATABASE_URL: zod_1.z.coerce.string(),
    ENCRYPTION_KEY: zod_1.z.coerce.string().min(32).max(32),
});
const _env = envSchema.safeParse(process.env);
if (!_env.success) {
    console.error("Invalid environment variables", _env.error.format());
    throw new Error("Invalid environment variables");
}
exports.ENV = _env.data;
//# sourceMappingURL=env.js.map