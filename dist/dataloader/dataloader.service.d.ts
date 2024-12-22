import { IDataloaders } from './dataloader.interface';
import { AdService } from 'src/ads/ads.service';
export declare class DataloaderService {
    private readonly adsLoader;
    constructor(adsLoader: AdService);
    getLoaders(): IDataloaders;
    private _createAdsLoader;
}
