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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const stripe_1 = require("stripe");
const coupon_entity_1 = require("./Entity/coupon.entity");
let CouponService = class CouponService {
    constructor(couponRepository) {
        this.couponRepository = couponRepository;
        this.stripe = new stripe_1.Stripe(process.env.STRIPE_SECRET_KEY);
    }
    async createCoupon(percentOff, duration, expiresInDays) {
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
        }
        catch (error) {
            console.error('Stripe API Error:', error);
            throw new Error(`Stripe API Error: ${error.message}`);
        }
    }
    async getAllCoupons() {
        return this.couponRepository.find();
    }
    async getCouponById(id) {
        try {
            const coupon = await this.couponRepository.findOne({ where: { id } });
            if (!coupon) {
                throw new Error(`Coupon with ID ${id} not found`);
            }
            return coupon;
        }
        catch (error) {
            console.error(' Error fetching coupon:', error);
            throw new Error(error.message);
        }
    }
};
exports.CouponService = CouponService;
exports.CouponService = CouponService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coupon_entity_1.CouponEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CouponService);
//# sourceMappingURL=coupon.service.js.map