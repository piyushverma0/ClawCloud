export declare class DopplerMockService {
    /**
     * Generates a secure, random API key of 64 characters
     */
    static generateApiKey(): string;
    /**
     * Simulates storing the API key securely in Doppler
     */
    static storeInstanceKey(instanceId: string, apiKey: string): Promise<boolean>;
    /**
     * Simulates rotating the API key in Doppler
     */
    static rotateInstanceKey(instanceId: string): Promise<string>;
}
//# sourceMappingURL=apiKeyService.d.ts.map