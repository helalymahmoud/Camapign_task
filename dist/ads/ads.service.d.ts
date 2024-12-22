import { CreateAdInput } from './dto/create-ad.input';
import { Ad } from './entities/ads.entity';
export declare class AdService {
    private readonly adRepository;
    [x: string]: any;
    constructor(adRepository: any);
    getAllAdsByCampaignIds(campaignId: readonly string[]): Promise<Ad[]>;
    CampaignAdsByBatch(campaignId: readonly string[]): Promise<(Ad | any)[]>;
    private _mapResultToIds;
    findAll(): Promise<Ad[]>;
    findOne(id: string): Promise<Ad>;
    create(CreateAdInput: CreateAdInput): Promise<Ad>;
    update(id: string, updateAdInput: CreateAdInput): Promise<Ad>;
    remove(id: string): Promise<void>;
}
