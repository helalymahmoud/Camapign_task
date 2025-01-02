import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersesrvice;
    private configservice;
    constructor(usersesrvice: UsersService, configservice: ConfigService);
    validate(payload: any): Promise<User>;
}
export {};
