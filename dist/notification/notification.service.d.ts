export declare class NotificationService {
    [x: string]: any;
    constructor();
    sendPushNotification(token: string, title: string, body: string): Promise<void>;
    sendDailyNotifications(): Promise<void>;
    private getUserTokens;
}
