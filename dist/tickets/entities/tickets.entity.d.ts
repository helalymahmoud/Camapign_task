import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Ticket {
    id: string;
    user: User;
    campaign: Campaign;
    createdAt: Date;
    expirationDate: Date;
    status: string;
}
