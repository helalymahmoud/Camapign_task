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
exports.DataloaderService = void 0;
const common_1 = require("@nestjs/common");
const DataLoader = require("dataloader");
const ads_service_1 = require("../ads/ads.service");
let DataloaderService = class DataloaderService {
    constructor(adService) {
        this.adService = adService;
    }
    getLoaders() {
        return {
            adsLoader: this._createAdsLoader(),
        };
    }
    _createAdsLoader() {
        return new DataLoader(async (adIds) => {
            console.log('Fetching Ads from DB:', adIds);
            const ads = await this.adService.CampaignAdsByBatch(adIds);
            const adMap = new Map(ads.map((ad) => [ad.id, ad]));
            return adIds.map((id) => adMap.get(id) || null);
        }, {
            cache: true,
            maxBatchSize: 50,
        });
    }
};
exports.DataloaderService = DataloaderService;
exports.DataloaderService = DataloaderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ads_service_1.AdService])
], DataloaderService);
//# sourceMappingURL=dataloader.service.js.map