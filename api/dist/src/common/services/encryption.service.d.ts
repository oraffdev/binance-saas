export declare class EncryptionService {
    private readonly algorithm;
    private readonly secretKey;
    encrypt(text: string): string;
    decrypt(hash: string): string;
}
