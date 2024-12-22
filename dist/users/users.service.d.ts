import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly userRepository;
    findUsersByCampaign(id: string): void;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, UpdateUserDto: any): Promise<User>;
    remove(id: string): Promise<void>;
}
