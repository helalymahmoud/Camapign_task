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
exports.PromoCodeResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const promo_code_service_1 = require("./promo-code.service");
const promo_code_type_1 = require("./dto/promo-code.type");
let PromoCodeResolver = class PromoCodeResolver {
    constructor(promoCodeService) {
        this.promoCodeService = promoCodeService;
    }
    async createPromoCode(couponId) {
        return await this.promoCodeService.createPromoCode(couponId);
    }
};
exports.PromoCodeResolver = PromoCodeResolver;
__decorate([
    (0, graphql_1.Mutation)(() => promo_code_type_1.PromoCodeType),
    __param(0, (0, graphql_1.Args)('couponId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromoCodeResolver.prototype, "createPromoCode", null);
exports.PromoCodeResolver = PromoCodeResolver = __decorate([
    (0, graphql_1.Resolver)(() => promo_code_type_1.PromoCodeType),
    __metadata("design:paramtypes", [promo_code_service_1.PromoCodeService])
], PromoCodeResolver);
//# sourceMappingURL=promo-code.resolver.js.map