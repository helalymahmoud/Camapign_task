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
exports.CampaignProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const campaigns_service_1 = require("./campaigns.service");
let CampaignProcessor = class CampaignProcessor {
    constructor(campaignService) {
        this.campaignService = campaignService;
    }
    async handleCreateCampaign(job) {
        const { createCampaignInput } = job.data;
        return await this.campaignService.create(createCampaignInput);
    }
    async handleUpdateCampaign(job) {
        const { id, updateCampaignInput } = job.data;
        return await this.campaignService.update(id, updateCampaignInput);
    }
};
exports.CampaignProcessor = CampaignProcessor;
__decorate([
    (0, bull_1.Process)('createCampaign'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampaignProcessor.prototype, "handleCreateCampaign", null);
__decorate([
    (0, bull_1.Process)('updateCampaign'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampaignProcessor.prototype, "handleUpdateCampaign", null);
exports.CampaignProcessor = CampaignProcessor = __decorate([
    (0, bull_1.Processor)('campaignQueue'),
    __metadata("design:paramtypes", [campaigns_service_1.CampaignService])
], CampaignProcessor);
//# sourceMappingURL=Campaign.Processor.js.map