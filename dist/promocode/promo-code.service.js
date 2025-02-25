"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromoCodeService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
const config_1 = require("@nestjs/config");
let PromoCodeService = class PromoCodeService {
    constructor(configService) {
        this.configService = configService;
        this.stripe = new stripe_1.Stripe(configService.get('STRIPE_SECRET_KEY'), {});
    }
    async createPromoCode(couponId) {
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
            });
            3;
            console.log(' Promo code created:', promoCode);
            return {
                id: promoCode.id,
                code: promoCode.code,
                duration: coupon.duration,
                percent_off: coupon.percent_off,
                created: promoCode.created,
            };
        }
        catch (error) {
            console.error(' Stripe API Error:', error);
            throw new Error(`Stripe API Error: ${error.message}`);
        }
    }
};
exports.PromoCodeService = PromoCodeService;
exports.PromoCodeService = PromoCodeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PromoCodeService);
//# sourceMappingURL=promo-code.service.js.map