import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/users/entities/user.entity';
export declare class AuthResolver {
    private readonly authService;
    verificationService: any;
    constructor(authService: AuthService);
    Register(registerDto: RegisterDto): Promise<string>;
    login(loginDto: LoginDto): Promise<User>;
    sendVerificationEmail(email: string): Promise<boolean>;
    verifyEmail(otp: string): Promise<boolean>;
    forgetPassword(email: string): Promise<string>;
    resetPassword(token: string, newPassword: string): Promise<string>;
}
