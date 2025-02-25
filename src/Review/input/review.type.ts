import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserType } from 'src/users/dto/user.type';

@ObjectType()
export class ReviewType {
  @Field(() => Int)
  id: number;

  @Field(() => UserType) 

  @Field(() => Int)
  rating: number;

  @Field({ nullable: true })
  comment?: string;

  @Field()
  createdAt: Date;
}
