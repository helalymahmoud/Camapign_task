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
exports.AdInteractionResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const ads_interaction_service_1 = require("./ads-interaction.service");
const ads_entity_1 = require("../ads/entities/ads.entity");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AdInteractionResolver = class AdInteractionResolver {
    constructor(adInteractionService, userRepository, adRepository) {
        this.adInteractionService = adInteractionService;
        this.userRepository = userRepository;
        this.adRepository = adRepository;
    }
    async trackAdInteraction(userId, adId, interactionType) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const ad = await this.adRepository.findOne({ where: { id: adId } });
        if (!user || !ad) {
            throw new Error('User or Ad not found');
        }
        await this.adInteractionService.trackInteraction(user, ad, interactionType);
        return `Interaction of type ${interactionType} tracked successfully.`;
    }
    async getAdStatistics(adId) {
        return this.adInteractionService.getAdStatistics(adId);
    }
};
exports.AdInteractionResolver = AdInteractionResolver;
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('userId')),
    __param(1, (0, graphql_1.Args)('adId')),
    __param(2, (0, graphql_1.Args)('interactionType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AdInteractionResolver.prototype, "trackAdInteraction", null);
__decorate([
    (0, graphql_1.Query)(() => Object),
    __param(0, (0, graphql_1.Args)('adId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdInteractionResolver.prototype, "getAdStatistics", null);
exports.AdInteractionResolver = AdInteractionResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(ads_entity_1.Ad)),
    __metadata("design:paramtypes", [ads_interaction_service_1.AdInteractionService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdInteractionResolver);
//# sourceMappingURL=ads-interaction.resolver.js.map