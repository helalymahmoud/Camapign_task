import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Review } from './Entity/Review.Entity';
import { CreateReviewDto } from './input/create-review.dto';
export declare class ReviewService {
    private reviewRepository;
    private userRepository;
    constructor(reviewRepository: Repository<Review>, userRepository: Repository<User>);
    createReview(userId: string, createReviewDto: CreateReviewDto): Promise<Review>;
    getAllReviews(): Promise<Review[]>;
    getReviewsByUser(userId: string): Promise<Review[]>;
    deleteReview(id: number): Promise<boolean>;
}
