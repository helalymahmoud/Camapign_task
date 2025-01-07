"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const campaigns_module_1 = require("../campaigns/campaigns.module");
const ads_entity_1 = require("./entities/ads.entity");
const ads_resolver_1 = require("./ads.resolver");
const ads_service_1 = require("./ads.service");
const dataloader_service_1 = require("../dataloader/dataloader.service");
const ad_repository_1 = require("./ad.repository");
let AdModule = class AdModule {
};
exports.AdModule = AdModule;
exports.AdModule = AdModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([ads_entity_1.Ad, ad_repository_1.adRepository]), campaigns_module_1.CampaignModule],
        providers: [ads_service_1.AdService, ads_resolver_1.AdResolver, dataloader_service_1.DataloaderService,],
        exports: [dataloader_service_1.DataloaderService]
    })
], AdModule);
//# sourceMappingURL=ads.module.js.map