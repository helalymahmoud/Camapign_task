import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { IDataloaders } from './dataloader.interface';
import { AdService } from 'src/ads/ads.service';
import { Ad } from 'src/ads/entities/ads.entity';

@Injectable()
export class DataloaderService {
  constructor(private readonly adService: AdService) {}

  getLoaders(): IDataloaders {
    return {
      adsLoader: this._createAdsLoader(),
    };
  }

  private _createAdsLoader() {
    return new DataLoader<string, Ad>(
      async (adIds: readonly string[]) => {
        console.log('Fetching Ads from DB:', adIds);
        const ads = await this.adService.CampaignAdsByBatch(adIds as string[]);
        const adMap = new Map(ads.map((ad) => [ad.id, ad]));
        return adIds.map((id) => adMap.get(id) || null);
      },
      {
        cache: true, 
        maxBatchSize: 50, 
      },
    );
  }
}
