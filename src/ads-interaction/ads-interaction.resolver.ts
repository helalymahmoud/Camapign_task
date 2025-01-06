import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AdInteractionService } from './ads-interaction.service';
import { Ad } from 'src/ads/entities/ads.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver()
export class AdInteractionResolver {
  constructor(
    private readonly adInteractionService: AdInteractionService,
    @InjectRepository(User) private readonly userRepository: Repository<User>, // Inject User repository
    @InjectRepository(Ad) private readonly adRepository: Repository<Ad>, // Inject Ad repository
  ) {}

  @Mutation(() => String)
  async trackAdInteraction(
    @Args('userId') userId: string,
    @Args('adId') adId: string,
    @Args('interactionType') interactionType: string,
  ): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const ad = await this.adRepository.findOne({ where: { id: adId } });

    if (!user || !ad) {
      throw new Error('User or Ad not found');
    }

    await this.adInteractionService.trackInteraction(user, ad, interactionType);

    return `Interaction of type ${interactionType} tracked successfully.`;
  }

  @Query(() => Object)
  async getAdStatistics(@Args('adId') adId: string): Promise<{ views: number; clicks: number; likes: number; score: number }> {
    return this.adInteractionService.getAdStatistics(adId);
  }
}
