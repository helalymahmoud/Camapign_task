import { Campaign } from "src/campaigns/entities/campaign.entity";
import { User } from "src/users/entities/user.entity";
import { Partner } from "src/Partners/entites/Partner.entity";
export declare class Ad {
    [x: string]: any;
    id: string;
    campaigned: string;
    title: string;
    content: string;
    type: string;
    status: string;
    campaigns: Campaign[];
    users: User[];
    partners: Partner[];
}
