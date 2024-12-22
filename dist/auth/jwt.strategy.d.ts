import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    authenticationService: any;
    constructor(configService: ConfigService);
    validate(email: string, password: string): Promise<any>;
}
export {};
