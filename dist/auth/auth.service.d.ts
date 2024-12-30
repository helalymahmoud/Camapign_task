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
    register(registerDto: RegisterDto): Promise<string>;
    login(loginDto: LoginDto): Promise<User>;
    sendVerificationEmail(email: string): Promise<boolean>;
    HandleForgetPassword(email: string): Promise<string>;
    HandleResetPassword(token: string, newPassword: string): Promise<string>;
}
