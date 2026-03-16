export declare class AlertService {
    private static botToken;
    private static chatId;
    static sendAlert(message: string): Promise<boolean>;
    static notifyAuthFailure(instanceId: string, attemptedIp: string): Promise<void>;
    static notifyUnusualActivity(instanceId: string, activityType: string): Promise<void>;
}
//# sourceMappingURL=alertService.d.ts.map