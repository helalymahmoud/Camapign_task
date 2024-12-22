import { User } from 'src/users/entities/user.entity';
export declare class Notification {
    id: string;
    message: string;
    timestamp: Date;
    user: User;
}
