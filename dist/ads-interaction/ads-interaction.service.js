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
exports.AdInteractionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ads_interaction_entity_1 = require("./ads-interaction.entity");
let AdInteractionService = class AdInteractionService {
    constructor(adInteractionRepository) {
        this.adInteractionRepository = adInteractionRepository;
    }
    async trackInteraction(user, ad, interactionType) {
        const interaction = new ads_interaction_entity_1.AdInteraction();
        interaction.user = user;
        interaction.ad = ad;
        interaction.interactionType = interactionType;
        interaction.timestamp = new Date();
        try {
            await this.adInteractionRepository.save(interaction);
        }
        catch (error) {
            console.error('Error saving interaction:', error);
            throw new Error('Could not save interaction');
        }
    }
    async getAdStatistics(adId) {
        try {
            const interactions = await this.adInteractionRepository.find({ where: { ad: { id: adId } } });
            const views = interactions.filter(i => i.interactionType === 'view').length;
            const clicks = interactions.filter(i => i.interactionType === 'click').length;
            const likes = interactions.filter(i => i.interactionType === 'like').length;
            const score = views > 0 ? (clicks / views) : 0;
            return { views, clicks, likes, score };
        }
        catch (error) {
            console.error('Error fetching statistics:', error);
            throw new Error('Could not fetch statistics');
        }
    }
};
exports.AdInteractionService = AdInteractionService;
exports.AdInteractionService = AdInteractionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ads_interaction_entity_1.AdInteraction)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdInteractionService);
//# sourceMappingURL=ads-interaction.service.js.map