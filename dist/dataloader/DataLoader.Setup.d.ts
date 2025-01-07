import * as DataLoader from 'dataloader';
import { AdService } from 'src/ads/ads.service';
export declare function createLoaders(adService: AdService): void;
export declare class AdsLoader {
    private readonly adsService;
    constructor(adsService: AdService);
    readonly adsLoader: DataLoader<string, any, string>;
}
