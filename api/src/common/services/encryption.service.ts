import { Injectable } from "@nestjs/common";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { ENV } from "../../env";

@Injectable()
export class EncryptionService {
	private readonly algorithm = "aes-256-ctr";
	private readonly secretKey = ENV.ENCRYPTION_KEY;

	encrypt(text: string): string {
		const iv = randomBytes(16); // Vetor de Inicialização
		const cipher = createCipheriv(
			this.algorithm,
			Buffer.from(this.secretKey),
			iv,
		);
		const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

		return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
	}

	decrypt(hash: string): string {
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

		const decipher = createDecipheriv(
			this.algorithm,
			Buffer.from(this.secretKey),
			iv,
		);

		const decrypted = Buffer.concat([
			decipher.update(encryptedText),
			decipher.final(),
		]);

		return decrypted.toString();
	}
}
