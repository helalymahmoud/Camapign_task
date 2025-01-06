"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const campaigns_resolver_1 = require("./campaigns.resolver");
const campaigns_service_1 = require("./campaigns.service");
const campaign_entity_1 = require("./entities/campaign.entity");
const dataloader_service_1 = require("../dataloader/dataloader.service");
const ads_service_1 = require("../ads/ads.service");
const ads_entity_1 = require("../ads/entities/ads.entity");
const bull_1 = require("@nestjs/bull");
const Campaign_Processor_1 = require("./Campaign.Processor");
let CampaignModule = class CampaignModule {
};
exports.CampaignModule = CampaignModule;
exports.CampaignModule = CampaignModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'campaignQueue',
                redis: { host: 'localhost', port: 6379 },
            }),
            typeorm_1.TypeOrmModule.forFeature([campaign_entity_1.Campaign, ads_entity_1.Ad,]),
        ],
        providers: [campaigns_service_1.CampaignService, campaigns_resolver_1.CampaignResolver, dataloader_service_1.DataloaderService, ads_service_1.AdService, Campaign_Processor_1.CampaignProcessor],
        exports: [dataloader_service_1.DataloaderService]
    })
], CampaignModule);
//# sourceMappingURL=campaigns.module.js.map