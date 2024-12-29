import { Ad } from "src/ads/entities/ads.entity";
import { Campaign } from "src/campaigns/entities/campaign.entity";
export declare class User {
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
}
