import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewService } from './review.service';
import { ReviewResolver } from './review.resolver';
import { User } from 'src/users/entities/user.entity';
import { Review } from './Entity/Review.Entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User])],
  providers: [ReviewService, ReviewResolver],
  exports: [ReviewService],
})
export class ReviewModule {}
