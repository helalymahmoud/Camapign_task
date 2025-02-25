import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Review } from './Entity/Review.Entity';
import { CreateReviewDto } from './input/create-review.dto';


@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createReview(userId: string, createReviewDto: CreateReviewDto): Promise<Review> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const review = this.reviewRepository.create({ ...createReviewDto, user });
    return this.reviewRepository.save(review);
  }

  async getAllReviews(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  async getReviewsByUser(userId: string): Promise<Review[]> {
    return this.reviewRepository.find({ where: { user: { id: userId } } });
  }

  async deleteReview(id: number): Promise<boolean> {
    const result = await this.reviewRepository.delete(id);
    return result.affected > 0;
  }
}
