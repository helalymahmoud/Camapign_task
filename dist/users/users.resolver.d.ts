import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateNotificationDto } from 'src/notification/dto/update-notification.input';
import { NotificationDto } from 'src/notification/dto/notification.dto';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    Users(_currentUser: User): Promise<User[]>;
    User(_currentUser: User, id: string): Promise<User>;
    createUser(_currentUser: User, name: string, email: string, password: string): Promise<User>;
    updateUser(_CurrentUser: User, id: string, updateUserDto: UpdateUserDto): Promise<User>;
    updatePassword(_CurrentUser: User, userId: string, newPassword: string): Promise<boolean>;
    removeUser(_CurrentUser: User, id: string): Promise<boolean>;
    enablePush(userId: string, notificationDto: NotificationDto): Promise<string>;
    disablePush(userId: string, updateNotificationDto: UpdateNotificationDto): Promise<string>;
}
