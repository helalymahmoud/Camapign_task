import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CouponType } from 'src/Coupon/dto/coupon.type';

@ObjectType()
export class PromoCodeType {
  @Field(() => ID)
  id: string;

  @Field()
  code: string;

  @Field(() => CouponType)
  coupon: CouponType;

  @Field()
  created: number;
}
