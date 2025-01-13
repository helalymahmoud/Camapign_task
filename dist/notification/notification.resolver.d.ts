import { UsersService } from 'src/users/users.service';
import { NotificationService } from './notification.service';
export declare class NotificationsResolver {
    private readonly usersService;
    private readonly notificationService;
    constructor(usersService: UsersService, notificationService: NotificationService);
    sendNotification(token: string, title: string, body: string): Promise<string>;
    subscribeToTopic(tokens: string[], topic: string): Promise<string>;
    unsubscribeFromTopic(tokens: string[], topic: string): Promise<string>;
}
