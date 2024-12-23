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
exports.AdResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_ad_input_1 = require("./dto/create-ad.input");
const ads_service_1 = require("./ads.service");
const ads_entity_1 = require("./entities/ads.entity");
const campaign_entity_1 = require("../campaigns/entities/campaign.entity");
let AdResolver = class AdResolver {
    constructor(adService) {
        this.adService = adService;
    }
    async getAds(campaign, { loaders }) {
        const { id: campaignId } = campaign;
        const ads = await loaders.adsLoader.load(campaignId);
        return ads || [];
    }
    async Ads() {
        const Ads = await this.adService.findAll();
        return Ads || [];
    }
    async Ad(id) {
        return this.adService.findOne(id);
    }
    async CreateAd(CreateAdInput) {
        return this.adService.create(CreateAdInput);
    }
    async UpdateAd(id, updateAdInput) {
        return this.adService.update(id, updateAdInput);
    }
    async removeAd(id) {
        await this.adService.remove(id);
        return true;
    }
};
exports.AdResolver = AdResolver;
__decorate([
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [campaign_entity_1.Campaign, Object]),
    __metadata("design:returntype", Promise)
], AdResolver.prototype, "getAds", null);
__decorate([
    (0, graphql_1.Query)(() => [ads_entity_1.Ad]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdResolver.prototype, "Ads", null);
__decorate([
    (0, graphql_1.Query)(() => ads_entity_1.Ad),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdResolver.prototype, "Ad", null);
__decorate([
    (0, graphql_1.Mutation)(() => ads_entity_1.Ad),
    __param(0, (0, graphql_1.Args)('createAdInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ad_input_1.CreateAdInput]),
    __metadata("design:returntype", Promise)
], AdResolver.prototype, "CreateAd", null);
__decorate([
    (0, graphql_1.Mutation)(() => ads_entity_1.Ad),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('updateAdInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_ad_input_1.CreateAdInput]),
    __metadata("design:returntype", Promise)
], AdResolver.prototype, "UpdateAd", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdResolver.prototype, "removeAd", null);
exports.AdResolver = AdResolver = __decorate([
    (0, graphql_1.Resolver)(() => ads_entity_1.Ad),
    __metadata("design:paramtypes", [ads_service_1.AdService])
], AdResolver);
//# sourceMappingURL=ads.resolver.js.map