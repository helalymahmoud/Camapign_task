import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly userRepository;
    findById(id: any): void;
    constructor(userRepository: Repository<User>);
    createUser(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<User>;
    findByEmail(email: string): Promise<User>;
    validateUser(email: string, password: string): Promise<User>;
    updatePassword(userId: string, newPassword: string): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, UpdateUserDto: any): Promise<User>;
    remove(id: string): Promise<void>;
}
