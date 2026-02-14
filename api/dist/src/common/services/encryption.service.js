"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionService = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const env_1 = require("../../env");
let EncryptionService = class EncryptionService {
    algorithm = "aes-256-ctr";
    secretKey = env_1.ENV.ENCRYPTION_KEY;
    encrypt(text) {
        const iv = (0, node_crypto_1.randomBytes)(16);
        const cipher = (0, node_crypto_1.createCipheriv)(this.algorithm, Buffer.from(this.secretKey), iv);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
        return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
    }
    decrypt(hash) {
        if (!hash.includes(":")) {
            throw new Error("Hash inválido ou corrompido ao tentar descriptografar.");
        }
        const textParts = hash.split(":");
        const ivHex = textParts.shift();
        if (!ivHex) {
            throw new Error("IV (Vetor de Inicialização) não encontrado no hash.");
        }
        const iv = Buffer.from(ivHex, "hex");
        const encryptedText = Buffer.from(textParts.join(":"), "hex");
        const decipher = (0, node_crypto_1.createDecipheriv)(this.algorithm, Buffer.from(this.secretKey), iv);
        const decrypted = Buffer.concat([
            decipher.update(encryptedText),
            decipher.final(),
        ]);
        return decrypted.toString();
    }
};
exports.EncryptionService = EncryptionService;
exports.EncryptionService = EncryptionService = __decorate([
    (0, common_1.Injectable)()
], EncryptionService);
//# sourceMappingURL=encryption.service.js.map