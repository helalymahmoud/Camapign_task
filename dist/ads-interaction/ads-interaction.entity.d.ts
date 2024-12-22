import { Ad } from 'src/ads/entities/ads.entity';
import { User } from 'src/users/entities/user.entity';
export declare class AdInteraction {
    id: string;
    user: User;
    ad: Ad;
    interactionType: string;
    timestamp: Date;
}
