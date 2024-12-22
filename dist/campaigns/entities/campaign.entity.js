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
exports.Campaign = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const ads_entity_1 = require("../../ads/entities/ads.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const Partner_entity_1 = require("../../Partners/entites/Partner.entity");
let Campaign = class Campaign {
};
exports.Campaign = Campaign;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Campaign.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Campaign.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Campaign.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Campaign.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Campaign.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Campaign.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ads_entity_1.Ad]),
    (0, typeorm_1.OneToMany)(() => ads_entity_1.Ad, (ad) => ad.campaigns),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Campaign.prototype, "ads", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Partner_entity_1.Partner]),
    (0, typeorm_1.ManyToOne)(() => Partner_entity_1.Partner, (partner) => partner.campaigns),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Campaign.prototype, "partners", void 0);
__decorate([
    (0, graphql_1.Field)(() => [user_entity_1.User]),
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.joinedCampaigns),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Campaign.prototype, "users", void 0);
exports.Campaign = Campaign = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Campaign);
//# sourceMappingURL=campaign.entity.js.map