import { User } from 'src/users/entities/user.entity';
export declare class NotificationToken {
    id: number;
    user: User;
    device_type: string;
    notification_token: string;
    status: string;
}
