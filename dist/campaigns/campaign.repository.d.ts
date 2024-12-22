import { Campaign } from './entities/campaign.entity';
export declare class CampaignRepository {
    getAll(): Promise<Campaign[]>;
}
