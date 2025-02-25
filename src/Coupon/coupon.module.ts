import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponService } from './coupon.service';
import { CouponResolver } from './coupon.resolver';
import { CouponEntity } from './Entity/coupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CouponEntity])], 
  providers: [CouponService, CouponResolver],
  exports: [CouponService],
})
export class CouponModule {}
