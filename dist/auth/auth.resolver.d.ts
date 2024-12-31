import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthResolver {
    private readonly authService;
    verificationService: any;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<string>;
    verifyOtp(email: string, otp: string): Promise<boolean>;
    login(loginDto: LoginDto): Promise<string>;
    sendResetPasswordLink(email: string): Promise<string>;
    resetPassword(token: string, newPassword: string): Promise<string>;
}
