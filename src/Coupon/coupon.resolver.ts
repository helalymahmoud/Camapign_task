import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CouponService } from './coupon.service';
import { CouponType } from './dto/coupon.type';
import { CouponEntity } from './Entity/coupon.entity';

@Resolver(() => CouponType)
export class CouponResolver {
  salesService: any;
  constructor(private readonly couponService: CouponService) {}

  @Mutation(() => CouponType)
  async createCoupon(
    @Args('percentOff') percentOff: number,
    @Args('duration') duration: 'once' | 'repeating' | 'forever',
    @Args('expiresInDays') expiresInDays: number,
  ) {
    return this.couponService.createCoupon(percentOff, duration, expiresInDays);
  }

  @Query(() => [CouponType])
  async getCoupons() {
    return this.couponService.getAllCoupons();
  }

  @Mutation(() => Boolean)
async deleteCoupon(@Args('couponId') couponId: string): Promise<boolean> {
  return this.salesService.deleteCoupon(couponId);
}



}
