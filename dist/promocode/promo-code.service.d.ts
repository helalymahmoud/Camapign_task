import { ConfigService } from '@nestjs/config';
export declare class PromoCodeService {
    private readonly configService;
    private stripe;
    constructor(configService: ConfigService);
    createPromoCode(couponId?: string): Promise<any>;
}
