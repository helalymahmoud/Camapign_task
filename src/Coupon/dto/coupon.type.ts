import { ObjectType, Field, Float, ID } from '@nestjs/graphql';

@ObjectType()
export class CouponType {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true }) 
  duration?: string;

  @Field(() => Float, { nullable: true })
  percent_off?: number;
}
