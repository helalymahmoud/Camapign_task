import { User } from 'src/users/entities/user.entity';
export declare class Review {
    id: number;
    user: User;
    rating: number;
    comment?: string;
    createdAt: Date;
}
