import { createUnionType } from '@nestjs/graphql';
import { Ad } from 'src/ads/entities/ads.entity';
import { Campaign } from './entities/campaign.entity';


export const SearchResultUnion = createUnionType({
  name: 'SearchResultUnion',
  types: () => [Campaign, Ad] as const,
  resolveType(value) {
    if ('description' in value) {
      return Campaign; 
    }
    if ('title' in value) {
      return Ad;
    }
    return null;
  },
});
