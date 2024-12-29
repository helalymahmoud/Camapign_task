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
exports.AdService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ads_entity_1 = require("./entities/ads.entity");
const typeorm_2 = require("typeorm");
let AdService = class AdService {
    constructor(adRepository) {
        this.adRepository = adRepository;
    }
    async CampaignAdsByBatch(campaignId) {
        const ads = await this.getAllAdsByCampaignIds(campaignId);
        const mappedResults = this._mapResultToIds(campaignId, ads);
        return mappedResults;
    }
    _mapResultToIds(campaignId, ads) {
        return campaignId.map((id) => ads.filter((ads) => ads.campaignId === id) || null);
    }
    async findAll() {
        return this.adRepository.find();
    }
    async findOne(id) {
        return this.adRepository.findOne({ where: { id } });
    }
    async create(CreateAdInput) {
        const ad = this.adRepository.create(CreateAdInput);
        return this.adRepository.save(ad);
    }
    async remove(id) {
        await this.adRepository.delete(id);
    }
};
exports.AdService = AdService;
exports.AdService = AdService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ads_entity_1.Ad)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdService);
//# sourceMappingURL=ads.service.js.map