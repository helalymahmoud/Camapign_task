export declare class NotificationService {
    sendNotification(payload: {
        token: string;
        title: string;
        body: string;
        icon?: string;
    }): Promise<string>;
    sendNotificationsToMultipleTokens(payload: {
        tokens: string[];
        title: string;
        body: string;
        icon?: string;
    }): Promise<void>;
    sendTopicNotification(payload: {
        topic: string;
        title: string;
        body: string;
        icon?: string;
    }): Promise<string>;
}
