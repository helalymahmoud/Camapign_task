import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly userRepository;
    userService: any;
    mailerService: any;
    constructor(jwtService: JwtService, userRepository: Repository<User>);
    signUp(user: User): Promise<void>;
    register(registerDto: RegisterDto): Promise<string>;
    login(loginDto: LoginDto): Promise<string>;
    HandleForgetPassword(email: string): Promise<string>;
    HandleResetPassword(token: string, newPassword: string): Promise<string>;
}
