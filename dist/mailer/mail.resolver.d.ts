import { MailService } from './mail.service';
export declare class UserResolver {
    private readonly mailService;
    constructor(mailService: MailService);
    sendWelcomeEmail(email: string, name: string): Promise<boolean>;
}
