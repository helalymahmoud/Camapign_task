import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    Users(): Promise<User[]>;
    User(id: string): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    removeUser(id: string): Promise<boolean>;
}
