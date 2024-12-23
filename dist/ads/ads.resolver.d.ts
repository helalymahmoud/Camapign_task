import { CreateAdInput } from './dto/create-ad.input';
import { AdService } from './ads.service';
import { Ad } from './entities/ads.entity';
import DataLoader from 'dataloader';
import { Campaign } from 'src/campaigns/entities/campaign.entity';
export declare class AdResolver {
    private adService;
    constructor(adService: AdService);
    getAds(campaign: Campaign, { loaders }: {
        loaders: {
            adsLoader: DataLoader<string, Ad[] | null>;
        };
    }): Promise<Ad[]>;
    Ads(): Promise<Ad[]>;
    Ad(id: string): Promise<Ad>;
    CreateAd(CreateAdInput: CreateAdInput): Promise<Ad>;
    UpdateAd(id: string, updateAdInput: CreateAdInput): Promise<Ad>;
    removeAd(id: string): Promise<boolean>;
}
