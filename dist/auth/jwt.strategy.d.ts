import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    private configService;
    [x: string]: any;
    constructor(usersService: UsersService, configService: ConfigService);
    validate(payload: any): Promise<{
        sub: string;
        email: string;
        roles: any;
    }>;
}
export {};
