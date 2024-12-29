import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    Users(): Promise<User[]>;
    User(id: string): Promise<User>;
    validateUser(email: string, password: string): Promise<User>;
    createUser(name: string, email: string, password: string): Promise<User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    updatePassword(userId: string, newPassword: string): Promise<boolean>;
    removeUser(id: string): Promise<boolean>;
}
