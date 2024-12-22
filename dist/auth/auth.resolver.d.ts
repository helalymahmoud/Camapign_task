import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    Register(registerDto: RegisterDto): Promise<string>;
    Login(loginDto: LoginDto): Promise<string>;
    forgetPassword(email: string): Promise<string>;
    resetPassword(token: string, newPassword: string): Promise<string>;
}
