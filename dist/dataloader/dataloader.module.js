"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataloaderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ads_module_1 = require("../ads/ads.module");
const campaigns_module_1 = require("../campaigns/campaigns.module");
const dataloader_service_1 = require("./dataloader.service");
const ads_service_1 = require("../ads/ads.service");
const ads_entity_1 = require("../ads/entities/ads.entity");
let DataloaderModule = class DataloaderModule {
};
exports.DataloaderModule = DataloaderModule;
exports.DataloaderModule = DataloaderModule = __decorate([
    (0, common_1.Module)({
        imports: [campaigns_module_1.CampaignModule, ads_module_1.AdModule, typeorm_1.TypeOrmModule.forFeature([ads_entity_1.Ad])],
        providers: [dataloader_service_1.DataloaderService, ads_service_1.AdService],
        exports: [dataloader_service_1.DataloaderService]
    })
], DataloaderModule);
//# sourceMappingURL=dataloader.module.js.map