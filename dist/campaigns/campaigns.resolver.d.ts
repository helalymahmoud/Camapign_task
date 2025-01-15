import { CreateCampaignInput } from './dto/create-campaign.input';
import { CampaignService } from './campaigns.service';
import { Campaign } from './entities/campaign.entity';
import { Ad } from 'src/ads/entities/ads.entity';
import { IDataloaders } from 'src/dataloader/dataloader.interface';
import { SearchInput } from './dto/Search-Input.dto';
import { Queue } from 'bull';
import { QueueService } from 'src/queue/queue.service';
export declare class CampaignResolver {
    private readonly campaignService;
    private readonly campaignQueue;
    adCampaignService: any;
    constructor(campaignService: CampaignService, campaignQueue: Queue);
    private readonly adService;
    queueService: QueueService;
    getAds(campaign: Campaign, { loaders }: {
        loaders: IDataloaders;
    }): Promise<Ad>;
    searchCampaignsUsingFind(searchKey: string): Promise<Campaign[]>;
    searchCampaignsUsingQueryBuilder(searchKey: string): Promise<Campaign[]>;
    search(input: SearchInput): Promise<string[]>;
    Campaigns(): Promise<Campaign[]>;
    Campaign(id: string): Promise<Campaign>;
    createCampaign(createCampaignInput: CreateCampaignInput): Promise<Campaign>;
    updateCampaign(id: string, updateCampaignInput: CreateCampaignInput): Promise<Campaign>;
    removeCampaign(id: string): Promise<boolean>;
}
