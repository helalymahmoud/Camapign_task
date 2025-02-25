import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { ConfigService } from '@nestjs/config';
import { PromoCodeType } from './dto/promo-code.type';

@Injectable()
export class PromoCodeService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_SECRET_KEY'), {
    });
  }

  async createPromoCode(couponId?: string): Promise<any> {
    try {
      console.log(' Creating coupon...'); 
      const coupon = await this.stripe.coupons.create({
        percent_off: 90,
        duration: 'once',
      });
  
      console.log(' Coupon created:', coupon); 
      console.log(' Creating promo code... ');
      const promoCode = await this.stripe.promotionCodes.create({
        coupon: coupon.id,
      }); 3
  
      console.log(' Promo code created:', promoCode);
      return {
        id: promoCode.id,
        code: promoCode.code,
        duration: coupon.duration,
        percent_off: coupon.percent_off,
        created: promoCode.created,
      };
    } catch (error) {
      console.error(' Stripe API Error:', error); 
      throw new Error(`Stripe API Error: ${error.message}`);
    }

    
  }
  
  
}
