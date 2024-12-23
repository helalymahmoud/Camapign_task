import { Resolver, Query, Mutation, Args, ResolveField, Parent, Context } from '@nestjs/graphql';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { CampaignService } from './campaigns.service';
import { Campaign } from './entities/campaign.entity';
import { AdService } from 'src/ads/ads.service';
import { Ad } from 'src/ads/entities/ads.entity';
import { IDataloaders } from 'src/dataloader/dataloader.interface';
import { SearchInput } from './dto/Search-Input.dto';
import { SearchResultUnion } from './unions';

@Resolver(() => Campaign)
export class CampaignResolver {
  adCampaignService: any; 
  constructor(
    private readonly campaignService: CampaignService,
    private readonly adService : AdService
  ) {} 

  @ResolveField('ads', () => [Ad])
  getAds(
    @Parent() campaign: Campaign,   
    @Context() { loaders }: { loaders: IDataloaders },
  ) {
    const { id: campaignId } = campaign;
    return loaders.adsLoader.load(campaignId);
  }
  
  
  @Query(() => [Campaign], { name: 'searchCampaignsUsingFind' })
  async searchCampaignsUsingFind(@Args('searchKey', { type: () => String }) searchKey: string) {
    return await this.campaignService.searchCampaignsUsingFind(searchKey);
  }

  @Query(() => [Campaign], { name: 'searchCampaignsUsingQueryBuilder' })
  async searchCampaignsUsingQueryBuilder(@Args('searchKey', { type: () => String }) searchKey: string) {
    return await this.campaignService.searchCampaigns(searchKey);
  }


  @Query(() => [SearchResultUnion], { name: 'search' })
  async search(@Args('input', { type: () => SearchInput }) input: SearchInput) {
    const campaigns = await this.campaignService.searchCampaigns(input)
    const ads = await this.adService.searchAds(input);

    return [...campaigns, ...ads];
  }

  
  @Query(() => [Campaign])
  async Campaigns():Promise<Campaign[]> { 
    const campaigns = await this.campaignService.findAll();
    return campaigns || []; 
  }
  
  @Query(() => Campaign)
  async Campaign(
    @Args('id') id: string): Promise<Campaign> {  
    return this.campaignService.findOne(id); 
 }

  @Mutation(() => Campaign)
  async createCampaign(
    @Args('createCampaignInput') createCampaignInput: CreateCampaignInput): Promise<Campaign> {
    return this.campaignService.create(createCampaignInput); 
     }
  @Mutation(()=>Campaign)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
  async updateCampaign(
    @Args('id') id: string, 
    @Args('updateCampaignInput') updateCampaignInput: CreateCampaignInput,): Promise<Campaign> {
    return this.campaignService.update(id, updateCampaignInput)
  }

  @Mutation(() => Boolean)  
  async removeCampaign(
    @Args('id') id: string): Promise<boolean> {
    await this.campaignService.remove(id); 
    return true;  
    }



}