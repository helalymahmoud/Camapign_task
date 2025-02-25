import { CouponService } from './coupon.service';
import { CouponEntity } from './Entity/coupon.entity';
export declare class CouponResolver {
    private readonly couponService;
    salesService: any;
    constructor(couponService: CouponService);
    createCoupon(percentOff: number, duration: 'once' | 'repeating' | 'forever', expiresInDays: number): Promise<{
        id: string;
        percent_off: number;
        duration: import("stripe").Stripe.Coupon.Duration;
        expires_at: Date;
    } & CouponEntity>;
    getCoupons(): Promise<CouponEntity[]>;
    deleteCoupon(couponId: string): Promise<boolean>;
}
