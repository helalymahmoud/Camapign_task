import { FindOperator } from 'typeorm';
export declare class UpdateNotificationDto {
    deviceToken: string;
    reason?: string;
    device_type: string | FindOperator<string>;
}
