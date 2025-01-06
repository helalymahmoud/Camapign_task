import { NotificationService } from './notification.service';
export declare class NotificationResolver {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    sendNotification(fcmToken: string, title: string, body: string): Promise<string>;
}
