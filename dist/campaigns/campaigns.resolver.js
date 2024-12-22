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
exports.CampaignResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_campaign_input_1 = require("./dto/create-campaign.input");
const campaigns_service_1 = require("./campaigns.service");
const campaign_entity_1 = require("./entities/campaign.entity");
const ads_service_1 = require("../ads/ads.service");
const ads_entity_1 = require("../ads/entities/ads.entity");
const Search_Input_dto_1 = require("./dto/Search-Input.dto");
const unions_1 = require("./unions");
let CampaignResolver = class CampaignResolver {
    constructor(campaignService, adService) {
        this.campaignService = campaignService;
        this.adService = adService;
    }
    getAds(campaign, { loaders }) {
        const { id: campaignId } = campaign;
        return loaders.adsLoader.load(campaignId);
    }
    async searchCampaignsUsingFind(searchKey) {
        return await this.campaignService.searchCampaignsUsingFind(searchKey);
    }
    async searchCampaignsUsingQueryBuilder(searchKey) {
        return await this.campaignService.searchCampaigns(searchKey);
    }
    async search(input) {
        const ads = await this.adService.searchAds(input);
        return [...ads];
    }
    async Campaigns() {
        const campaigns = await this.campaignService.findAll();
        return campaigns || [];
    }
    async Campaign(id) {
        return this.campaignService.findOne(id);
    }
    async createCampaign(createCampaignInput) {
        return this.campaignService.create(createCampaignInput);
    }
    async updateCampaign(id, updateCampaignInput) {
        return this.campaignService.update(id, updateCampaignInput);
    }
    async removeCampaign(id) {
        await this.campaignService.remove(id);
        return true;
    }
};
exports.CampaignResolver = CampaignResolver;
__decorate([
    (0, graphql_1.ResolveField)('ads', () => [ads_entity_1.Ad]),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [campaign_entity_1.Campaign, Object]),
    __metadata("design:returntype", void 0)
], CampaignResolver.prototype, "getAds", null);
__decorate([
    (0, graphql_1.Query)(() => [campaign_entity_1.Campaign], { name: 'searchCampaignsUsingFind' }),
    __param(0, (0, graphql_1.Args)('searchKey', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignResolver.prototype, "searchCampaignsUsingFind", null);
__decorate([
    (0, graphql_1.Query)(() => [campaign_entity_1.Campaign], { name: 'searchCampaignsUsingQueryBuilder' }),
    __param(0, (0, graphql_1.Args)('searchKey', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignResolver.prototype, "searchCampaignsUsingQueryBuilder", null);
__decorate([
    (0, graphql_1.Query)(() => [unions_1.SearchResultUnion], { name: 'search' }),
    __param(0, (0, graphql_1.Args)('input', { type: () => Search_Input_dto_1.SearchInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Search_Input_dto_1.SearchInput]),
    __metadata("design:returntype", Promise)
], CampaignResolver.prototype, "search", null);
__decorate([
    (0, graphql_1.Query)(() => [campaign_entity_1.Campaign]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CampaignResolver.prototype, "Campaigns", null);
__decorate([
    (0, graphql_1.Query)(() => campaign_entity_1.Campaign),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignResolver.prototype, "Campaign", null);
__decorate([
    (0, graphql_1.Mutation)(() => campaign_entity_1.Campaign),
    __param(0, (0, graphql_1.Args)('createCampaignInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_campaign_input_1.CreateCampaignInput]),
    __metadata("design:returntype", Promise)
], CampaignResolver.prototype, "createCampaign", null);
__decorate([
    (0, graphql_1.Mutation)(() => campaign_entity_1.Campaign),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('updateCampaignInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_campaign_input_1.CreateCampaignInput]),
    __metadata("design:returntype", Promise)
], CampaignResolver.prototype, "updateCampaign", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignResolver.prototype, "removeCampaign", null);
exports.CampaignResolver = CampaignResolver = __decorate([
    (0, graphql_1.Resolver)(() => campaign_entity_1.Campaign),
    __metadata("design:paramtypes", [campaigns_service_1.CampaignService,
        ads_service_1.AdService])
], CampaignResolver);
//# sourceMappingURL=campaigns.resolver.js.map