import { CreateAdInput } from './dto/create-ad.input';
import { AdService } from './ads.service';
import { Ad } from './entities/ads.entity';
export declare class AdResolver {
    private adService;
    constructor(adService: AdService);
    Ads(): Promise<Ad[]>;
    Ad(id: string): Promise<Ad>;
    CreateAd(CreateAdInput: CreateAdInput): Promise<Ad>;
    UpdateAd(id: string, updateAdInput: CreateAdInput): Promise<Ad>;
    removeAd(id: string): Promise<boolean>;
}
