import { Repository } from 'typeorm';
import { Stripe } from 'stripe';
import { CouponEntity } from './Entity/coupon.entity';
export declare class CouponService {
    private couponRepository;
    private stripe;
    constructor(couponRepository: Repository<CouponEntity>);
    createCoupon(percentOff: number, duration: 'once' | 'repeating' | 'forever', expiresInDays: number): Promise<{
        id: string;
        percent_off: number;
        duration: Stripe.Coupon.Duration;
        expires_at: Date;
    } & CouponEntity>;
    getAllCoupons(): Promise<CouponEntity[]>;
    getCouponById(id: string): Promise<CouponEntity>;
}
