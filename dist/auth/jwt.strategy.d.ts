import { AuthService } from './auth.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    authenticationService: any;
    constructor(authService: AuthService);
    validateemail(email: string, password: string): Promise<any>;
    validatepassword(email: string, password: string): Promise<any>;
}
export {};
