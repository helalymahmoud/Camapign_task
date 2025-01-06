import { AdInteractionService } from './ads-interaction.service';
import { Ad } from 'src/ads/entities/ads.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class AdInteractionResolver {
    private readonly adInteractionService;
    private readonly userRepository;
    private readonly adRepository;
    constructor(adInteractionService: AdInteractionService, userRepository: Repository<User>, adRepository: Repository<Ad>);
    trackAdInteraction(userId: string, adId: string, interactionType: string): Promise<string>;
    getAdStatistics(adId: string): Promise<{
        views: number;
        clicks: number;
        likes: number;
        score: number;
    }>;
}
