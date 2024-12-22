import { Repository } from 'typeorm';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { Campaign } from './entities/campaign.entity';
import { SearchInput } from './dto/Search-Input.dto';
export declare class CampaignService {
    private readonly campaignRepository;
    adRepository: any;
    campaignService: any;
    adService: any;
    createQueryBuilder(arg0: string): void;
    constructor(campaignRepository: Repository<Campaign>);
    getCampaignsStartingInNext24Hours(): Promise<Campaign[]>;
    getCampaignsStartingNow(): Promise<Campaign[]>;
    searchCampaignsUsingFind(searchKey: string): Promise<Campaign[]>;
    searchCampaigns(searchKey: string): Promise<Campaign[]>;
    search(input: SearchInput): Promise<any[]>;
    findAll(pageMumber?: number, reviewPrePage?: number): Promise<Campaign[]>;
    findOne(id: string): Promise<Campaign>;
    create(createCampaignInput: CreateCampaignInput): Promise<Campaign>;
    update(id: string, updateCampaignInput: CreateCampaignInput): Promise<Campaign>;
    remove(id: string): Promise<void>;
}
