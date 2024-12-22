import { Ad } from "src/ads/entities/ads.entity";
import { User } from "src/users/entities/user.entity";
import { Partner } from "src/Partners/entites/Partner.entity";
export declare class Campaign {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: string;
    ads: Ad[];
    partners: Partner[];
    users: User[];
}
