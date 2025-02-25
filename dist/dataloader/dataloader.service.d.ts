import { IDataloaders } from './dataloader.interface';
import { AdService } from 'src/ads/ads.service';
export declare class DataloaderService {
    private readonly adService;
    constructor(adService: AdService);
    getLoaders(): IDataloaders;
    private _createAdsLoader;
}
