import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stripe } from 'stripe';
import { CouponEntity } from './Entity/coupon.entity';

@Injectable()
export class CouponService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(CouponEntity)
    private couponRepository: Repository<CouponEntity>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, );
  }

  async createCoupon(
    percentOff: number, 
    duration: 'once' | 'repeating' | 'forever', 
    expiresInDays: number
  ) {
    try {
      const expiresAt = Math.floor(Date.now() / 1000) + expiresInDays * 24 * 60 * 60;

      const coupon = await this.stripe.coupons.create({
        percent_off: parseFloat(percentOff.toFixed(2)),
        duration: duration,
        redeem_by: expiresAt,   
 
      });

      if (!coupon.id) {
        throw new Error('Stripe API did not return a valid coupon ID');
      }

      const savedCoupon = await this.couponRepository.save({
        id: coupon.id,
        percent_off: Math.round(coupon.percent_off), 
        duration: coupon.duration,
        expires_at: new Date(expiresAt * 1000),
      });
      

      
      console.log(' Coupon created and saved:', savedCoupon);
      return savedCoupon;
    } catch (error) {
      console.error('Stripe API Error:', error);
      throw new Error(`Stripe API Error: ${error.message}`);
    }
  }

  async getAllCoupons() {
    return this.couponRepository.find();
  }

  async getCouponById(id: string) {
    try {
      const coupon = await this.couponRepository.findOne({ where: { id } });
      if (!coupon) {
        throw new Error(`Coupon with ID ${id} not found`);
      }
      return coupon;
    } catch (error) {
      console.error(' Error fetching coupon:', error);
      throw new Error(error.message);
    }
  }



  
  
  
}
