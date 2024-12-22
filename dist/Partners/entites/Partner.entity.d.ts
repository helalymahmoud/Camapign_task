import { Campaign } from "src/campaigns/entities/campaign.entity";
import { Ad } from "src/ads/entities/ads.entity";
export declare class Partner {
    id: string;
    name: string;
    contactInfo: string;
    campaigns: Campaign[];
    ads: Ad[];
}
