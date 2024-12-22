"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerModule = void 0;
const common_1 = require("@nestjs/common");
const partner_service_1 = require("./partner.service");
const typeorm_1 = require("@nestjs/typeorm");
const Partner_entity_1 = require("./entites/Partner.entity");
const partner_resolver_1 = require("./partner.resolver");
const campaign_entity_1 = require("../campaigns/entities/campaign.entity");
let PartnerModule = class PartnerModule {
};
exports.PartnerModule = PartnerModule;
exports.PartnerModule = PartnerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Partner_entity_1.Partner, campaign_entity_1.Campaign]),],
        providers: [partner_service_1.PartnerService, partner_resolver_1.PartnerResolver,],
    })
], PartnerModule);
//# sourceMappingURL=partner.module.js.map