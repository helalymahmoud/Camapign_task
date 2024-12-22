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
exports.PartnerResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const partner_service_1 = require("./partner.service");
const create_partner_input_1 = require("./dto/create-partner.input");
const Partner_entity_1 = require("./entites/Partner.entity");
let PartnerResolver = class PartnerResolver {
    constructor(partnerService) {
        this.partnerService = partnerService;
    }
    async Partners() {
        const partner = await this.partnerService.findAll();
        return partner || [];
    }
    async Partner(id) {
        return this.partnerService.findOne(id);
    }
    async createPartner(CreatePartnerInput) {
        return this.partnerService.create(CreatePartnerInput);
    }
    async updatePartner(id, updatePartnerInput) {
        return this.partnerService.update(id, updatePartnerInput);
    }
    async removePartner(id) {
        await this.partnerService.remove(id);
        return true;
    }
};
exports.PartnerResolver = PartnerResolver;
__decorate([
    (0, graphql_1.Query)(() => [Partner_entity_1.Partner]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PartnerResolver.prototype, "Partners", null);
__decorate([
    (0, graphql_1.Query)(() => Partner_entity_1.Partner),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PartnerResolver.prototype, "Partner", null);
__decorate([
    (0, graphql_1.Mutation)(() => Partner_entity_1.Partner),
    __param(0, (0, graphql_1.Args)('createPartnerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_partner_input_1.CreatePartnerInput]),
    __metadata("design:returntype", Promise)
], PartnerResolver.prototype, "createPartner", null);
__decorate([
    (0, graphql_1.Mutation)(() => Partner_entity_1.Partner),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('updatePartnerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_partner_input_1.CreatePartnerInput]),
    __metadata("design:returntype", Promise)
], PartnerResolver.prototype, "updatePartner", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PartnerResolver.prototype, "removePartner", null);
exports.PartnerResolver = PartnerResolver = __decorate([
    (0, graphql_1.Resolver)(() => Partner_entity_1.Partner),
    __metadata("design:paramtypes", [partner_service_1.PartnerService])
], PartnerResolver);
//# sourceMappingURL=partner.resolver.js.map