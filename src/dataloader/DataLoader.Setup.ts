import * as DataLoader from 'dataloader';
import { AdService } from 'src/ads/ads.service';
import { Ad } from 'src/ads/entities/ads.entity';

export function createLoaders(adService: AdService) {
  return {
    adsLoader: new DataLoader<string, Ad[] | null>(async (campaignIds) => {
      return await adService.CampaignAdsByBatch(campaignIds);
    }),
  };
}
