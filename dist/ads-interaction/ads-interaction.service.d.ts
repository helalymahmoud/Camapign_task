import { Ad } from 'src/ads/entities/ads.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AdInteraction } from './ads-interaction.entity';
export declare class AdInteractionService {
    private adInteractionRepository;
    constructor(adInteractionRepository: Repository<AdInteraction>);
    trackInteraction(user: User, ad: Ad, interactionType: string): Promise<void>;
    getAdStatistics(adId: string): Promise<{
        views: number;
        clicks: number;
        likes: number;
        score: number;
    }>;
}
