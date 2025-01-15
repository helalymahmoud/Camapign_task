import { UsersService } from 'src/users/users.service';
import { NotificationService } from './notification.service';
export declare class NotificationsResolver {
    private readonly usersService;
    constructor(usersService: UsersService, _notificationService: NotificationService);
    sendNotification(token: string, title: string, body: string): Promise<string>;
    subscribeToTopic(tokens: string[], topic: string): Promise<string>;
    unsubscribeFromTopic(tokens: string[], topic: string): Promise<string>;
}
