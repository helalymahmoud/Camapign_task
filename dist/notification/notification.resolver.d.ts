import { NotificationService } from './notification.service';
export declare class NotificationResolver {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    SendNotification(FcmToken: string, title: string, body: string): Promise<string>;
}
