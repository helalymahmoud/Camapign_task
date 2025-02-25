import { PromoCodeService } from './promo-code.service';
import { PromoCodeType } from './dto/promo-code.type';
export declare class PromoCodeResolver {
    private readonly promoCodeService;
    constructor(promoCodeService: PromoCodeService);
    createPromoCode(couponId: string): Promise<PromoCodeType>;
}
