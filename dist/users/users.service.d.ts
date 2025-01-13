import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { NotificationService } from 'src/notification/notification.service';
import { UpdateNotificationDto } from 'src/notification/dto/update-notification.input';
import { NotificationDto } from 'src/notification/dto/notification.dto';
export declare class UsersService {
    private readonly userRepository;
    private readonly notificationService;
    constructor(userRepository: Repository<User>, notificationService: NotificationService);
    createUser(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<User>;
    findByEmail(email: string): Promise<User>;
    updatePassword(userId: string, newPassword: string): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, UpdateUserDto: any): Promise<User>;
    remove(id: string): Promise<void>;
    enablePush: (user_id: string, update_dto: NotificationDto) => Promise<any>;
    disablePush: (user_id: string, update_dto: UpdateNotificationDto) => Promise<any>;
    getPushNotifications: () => Promise<any>;
    sendNotification(token: string, message: any): Promise<void>;
    subscribeToTopic(tokens: string[], topic: string): Promise<void>;
    unsubscribeFromTopic(tokens: string[], topic: string): Promise<void>;
}
