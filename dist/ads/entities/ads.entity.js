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
exports.Ad = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const campaign_entity_1 = require("../../campaigns/entities/campaign.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const Partner_entity_1 = require("../../Partners/entites/Partner.entity");
let Ad = class Ad {
};
exports.Ad = Ad;
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Ad.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ad.prototype, "campaigned", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ad.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ad.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ad.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ad.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => campaign_entity_1.Campaign, (campaign) => campaign.ads),
    __metadata("design:type", Array)
], Ad.prototype, "campaigns", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (User) => User.ads),
    __metadata("design:type", Array)
], Ad.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Partner_entity_1.Partner, (Partner) => Partner.ads),
    __metadata("design:type", Array)
], Ad.prototype, "partners", void 0);
exports.Ad = Ad = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Ad);
//# sourceMappingURL=ads.entity.js.map