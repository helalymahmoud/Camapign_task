import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { MailService } from 'src/mailer/mail.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly userRepository;
    private readonly mailerService;
    mailService: any;
    userService: any;
    users: any;
    constructor(jwtService: JwtService, userRepository: Repository<User>, mailerService: MailService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
    }>;
    verifyOtp(email: string, otp: string): Promise<boolean>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    sendResetPasswordLink(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
}
