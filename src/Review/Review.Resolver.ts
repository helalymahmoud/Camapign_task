import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './input/create-review.dto';
import { ReviewType } from './input/review.type';

@Resolver(() => ReviewType)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(() => ReviewType)
  async addReview(
    @Args('userId') userId: string,
    @Args('reviewData') reviewData: CreateReviewDto,
  ) {
    return this.reviewService.createReview(userId, reviewData);
  }

  @Query(() => [ReviewType])
  async getAllReviews() {
    return this.reviewService.getAllReviews();
  }

  @Query(() => [ReviewType])
  async getUserReviews(@Args('userId') userId: string) {
    return this.reviewService.getReviewsByUser(userId);
  }

  @Mutation(() => Boolean)
  async deleteReview(@Args('id', { type: () => Int }) id: number) {
    return this.reviewService.deleteReview(id);
  }
}
