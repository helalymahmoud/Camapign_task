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
exports.AdsLoader = void 0;
exports.createLoaders = createLoaders;
const common_1 = require("@nestjs/common");
const DataLoader = require("dataloader");
const ads_service_1 = require("../ads/ads.service");
function createLoaders(adService) { }
let AdsLoader = class AdsLoader {
    constructor(adsService) {
        this.adsService = adsService;
        this.adsLoader = new DataLoader(async (campaignIds) => {
            const ads = await this.adsService.findAdsByCampaignIds(campaignIds);
            return campaignIds.map((id) => ads.filter((ad) => ad.campaignId === id));
        });
    }
};
exports.AdsLoader = AdsLoader;
exports.AdsLoader = AdsLoader = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ads_service_1.AdService])
], AdsLoader);
//# sourceMappingURL=DataLoader.Setup.js.map