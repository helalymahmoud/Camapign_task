import { MailService } from './mail.service';
export declare class EmailResolver {
    private readonly mailservice;
    constructor(mailservice: MailService);
    sendVerificationEmail(email: string, token: string): Promise<boolean>;
}
