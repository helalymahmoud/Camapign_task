import { Queue } from 'bull';
export declare class QueueService {
    private readonly taskQueue;
    constructor(taskQueue: Queue);
    addTask(data: any): Promise<void>;
}
