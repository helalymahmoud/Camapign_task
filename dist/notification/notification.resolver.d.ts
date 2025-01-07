import { NotificationService } from './notification.service';
import { SendMultipleNotificationsInput } from './dto/send-multiple-notifications.input';
import { SendNotificationInput } from './dto/send-notification.input';
import { SendTopicNotificationInput } from './dto/send-topic-notification.input';
export declare class NotificationResolver {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    sendNotification(input: SendNotificationInput): Promise<string>;
    sendMultipleNotifications(input: SendMultipleNotificationsInput): Promise<string>;
    sendTopicNotification(input: SendTopicNotificationInput): Promise<string>;
}
