import * as DataLoader from 'dataloader';
import { AdService } from 'src/ads/ads.service';
import { Ad } from 'src/ads/entities/ads.entity';
export declare function createLoaders(adService: AdService): {
    adsLoader: DataLoader<string, Ad[], string>;
};
