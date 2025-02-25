import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateReviewDto {
  @Field(() => Int)
  rating: number;

  @Field({ nullable: true })
  comment?: string;
}
