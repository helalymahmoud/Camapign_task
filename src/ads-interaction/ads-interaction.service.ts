import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ad } from 'src/ads/entities/ads.entity';
import { User } from 'src/users/entities/user.entity';
import { AdInteraction } from './ads-interaction.entity';

@Injectable()
export class AdInteractionService {
  constructor(
    @InjectRepository(AdInteraction)
    private adInteractionRepository: Repository<AdInteraction>,
  ) {}

  async trackInteraction(user: User, ad: Ad, interactionType: string): Promise<void> {
    const interaction = new AdInteraction();
    interaction.user = user;
    interaction.ad = ad;
    interaction.interactionType = interactionType;
    interaction.timestamp = new Date();

    try {
      await this.adInteractionRepository.save(interaction);
    } catch (error) {
      console.error('Error saving interaction:', error);
      throw new Error('Could not save interaction');
    }
  }

  async getAdStatistics(adId: string): Promise<{ views: number; clicks: number; likes: number; score: number }> {
    try {
      const interactions = await this.adInteractionRepository.find({ where: { ad: { id: adId } } });

      const views = interactions.filter(i => i.interactionType === 'view').length;
      const clicks = interactions.filter(i => i.interactionType === 'click').length;
      const likes = interactions.filter(i => i.interactionType === 'like').length;
      const score = views > 0 ? (clicks / views) : 0;

      return { views, clicks, likes, score };
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw new Error('Could not fetch statistics');
    }
  }
}
