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
    users: any;
    constructor(jwtService: JwtService, userRepository: Repository<User>);
    register(registerDto: RegisterDto): Promise<string>;
    login(loginDto: LoginDto): Promise<string>;
    sendVerificationEmail(email: string): Promise<any>;
    verifyEmail(Otp: string): Promise<boolean>;
    HandleForgetPassword(email: string): Promise<string>;
    HandleResetPassword(token: string, newPassword: string): Promise<string>;
}
