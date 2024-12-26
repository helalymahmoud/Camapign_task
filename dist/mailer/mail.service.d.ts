import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/entities/user.entity';
export declare class MailService {
    private mailerService;
    sendWelcomeEmail(email: string, name: string): void;
    constructor(mailerService: MailerService);
    sendUserConfirmation(user: User, token: string): Promise<void>;
}
