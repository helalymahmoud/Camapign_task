import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { NotificationService } from 'src/notification/notification.service';
import { UpdateNotificationDto } from 'src/notification/dto/update-notification.input';
import { NotificationDto } from 'src/notification/dto/notification.dto';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly userRepository;
    private readonly notificationService;
    unsubscribeFromTopic(tokens: string[], topic: string): void;
    subscribeToTopic(tokens: string[], topic: string): void;
    getUser(username: any): User | PromiseLike<User>;
    findById(id: any): void;
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
    create(user: CreateUserDto): Promise<User>;
    updateProfile: (user_id: string, update_dto: any) => Promise<any>;
    enablePush: (user_id: string, update_dto: NotificationDto) => Promise<any>;
    disablePush: (user_id: string, update_dto: UpdateNotificationDto) => Promise<any>;
    getPushNotifications: () => Promise<any>;
    sendNotification(token: string, message: any): Promise<void>;
}
