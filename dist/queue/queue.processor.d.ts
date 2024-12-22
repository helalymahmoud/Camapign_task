import { Job } from 'bull';
export declare class QueueProcessor {
    handleTask(job: Job): Promise<void>;
}
