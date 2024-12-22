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
exports.Partner = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const campaign_entity_1 = require("../../campaigns/entities/campaign.entity");
const ads_entity_1 = require("../../ads/entities/ads.entity");
let Partner = class Partner {
};
exports.Partner = Partner;
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Partner.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Partner.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Partner.prototype, "contactInfo", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    (0, typeorm_1.ManyToMany)(() => campaign_entity_1.Campaign, (campaign) => campaign.partners),
    __metadata("design:type", Array)
], Partner.prototype, "campaigns", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => ads_entity_1.Ad, (ads) => ads.partners),
    __metadata("design:type", Array)
], Partner.prototype, "ads", void 0);
exports.Partner = Partner = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Partner);
//# sourceMappingURL=Partner.entity.js.map