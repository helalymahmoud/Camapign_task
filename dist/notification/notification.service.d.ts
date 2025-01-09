import { Notifications } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { NotificationToken } from './entities/notification-token.entity';
import { NotificationDto } from './dto/notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.input';
export declare class NotificationService {
    private readonly notificationsRepo;
    private readonly notificationTokenRepo;
    constructor(notificationsRepo: Repository<Notifications>, notificationTokenRepo: Repository<NotificationToken>);
    acceptPushNotification: (user: any, notification_dto: NotificationDto) => Promise<NotificationToken>;
    disablePushNotification: (user: any, update_dto: UpdateNotificationDto) => Promise<void>;
    getNotifications: () => Promise<any>;
    sendPush: (user: any, title: string, body: string) => Promise<void>;
}
