export declare class MailService {
    [x: string]: any;
    private transporter;
    constructor();
    sendRestPasswordTemplate(email: string, resetPasswordLink: string): Promise<void>;
    sendMail(to: string, subject: string, text: string, html: string): Promise<boolean>;
}
