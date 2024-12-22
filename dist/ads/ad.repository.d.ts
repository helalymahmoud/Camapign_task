import { Ad } from "./entities/ads.entity";
export declare class adRepository {
    AdsByCampaignIds(campaignId: readonly string[]): Promise<Ad[]>;
}
