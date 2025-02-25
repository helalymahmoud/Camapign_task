import { ReviewService } from './review.service';
import { CreateReviewDto } from './input/create-review.dto';
export declare class ReviewResolver {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    addReview(userId: string, reviewData: CreateReviewDto): Promise<import("./Entity/Review.Entity").Review>;
    getAllReviews(): Promise<import("./Entity/Review.Entity").Review[]>;
    getUserReviews(userId: string): Promise<import("./Entity/Review.Entity").Review[]>;
    deleteReview(id: number): Promise<boolean>;
}
