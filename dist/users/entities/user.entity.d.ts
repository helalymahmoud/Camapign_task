import { Ad } from "src/ads/entities/ads.entity";
import { Campaign } from "src/campaigns/entities/campaign.entity";
import { Message } from "src/chat/Entity/message.entity";
export declare class User {
    static findOne(arg0: {
        where: {
            id: string;
        };
    }): void;
    [x: string]: any;
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    fcmToken: string;
    joinedCampaigns: Campaign[];
    tickets: any;
    ads: Ad[];
    otp: string;
    otpExpiresAt: Date;
    resetPasswordToken: string;
    resetPasswordExpiresAt: Date;
    status: string;
    sentMessages: Message[];
    receivedMessages: Message[];
}
