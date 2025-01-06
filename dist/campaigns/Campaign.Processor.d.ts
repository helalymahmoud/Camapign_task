import { Job } from 'bull';
import { CampaignService } from './campaigns.service';
export declare class CampaignProcessor {
    private readonly campaignService;
    constructor(campaignService: CampaignService);
    handleCreateCampaign(job: Job): Promise<import("./entities/campaign.entity").Campaign>;
    handleUpdateCampaign(job: Job): Promise<import("./entities/campaign.entity").Campaign>;
}
