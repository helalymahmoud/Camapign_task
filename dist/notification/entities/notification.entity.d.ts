import { NotificationToken } from './notification-token.entity';
export declare class Notifications {
    id: string;
    notification_token: NotificationToken;
    title: string;
    body: string;
    created_by: string;
    status: string;
}
