import { Job } from 'bull';
export declare class NotificationProcessor {
    handleSendNotification(job: Job): Promise<void>;
}
