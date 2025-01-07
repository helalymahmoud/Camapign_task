  import { Injectable } from '@nestjs/common';
  import * as DataLoader from 'dataloader';
  import { AdService } from 'src/ads/ads.service';
  import { Ad } from 'src/ads/entities/ads.entity';

  export function createLoaders(adService: AdService) {}
  @Injectable()
  export class AdsLoader {
    constructor(private readonly adsService: AdService) {}

    public readonly adsLoader = new DataLoader(async (campaignIds: string[]) => {
      const ads = await this.adsService.findAdsByCampaignIds(campaignIds);
      return campaignIds.map((id) => ads.filter((ad) => ad.campaignId === id));
    });
  }
