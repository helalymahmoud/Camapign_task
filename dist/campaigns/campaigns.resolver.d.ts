import { CreateCampaignInput } from './dto/create-campaign.input';
import { CampaignService } from './campaigns.service';
import { Campaign } from './entities/campaign.entity';
import { AdService } from 'src/ads/ads.service';
import { Ad } from 'src/ads/entities/ads.entity';
import { IDataloaders } from 'src/dataloader/dataloader.interface';
import { SearchInput } from './dto/Search-Input.dto';
export declare class CampaignResolver {
    private readonly campaignService;
    private readonly adService;
    adCampaignService: any;
    constructor(campaignService: CampaignService, adService: AdService);
    getAds(campaign: Campaign, { loaders }: {
        loaders: IDataloaders;
    }): Promise<Ad>;
    searchCampaignsUsingFind(searchKey: string): Promise<Campaign[]>;
    searchCampaignsUsingQueryBuilder(searchKey: string): Promise<Campaign[]>;
    search(input: SearchInput): Promise<any[]>;
    Campaigns(): Promise<Campaign[]>;
    Campaign(id: string): Promise<Campaign>;
    createCampaign(createCampaignInput: CreateCampaignInput): Promise<Campaign>;
    updateCampaign(id: string, updateCampaignInput: CreateCampaignInput): Promise<Campaign>;
    removeCampaign(id: string): Promise<boolean>;
}
