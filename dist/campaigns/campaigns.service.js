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
exports.CampaignService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const campaign_entity_1 = require("./entities/campaign.entity");
const process_1 = require("process");
const Search_Input_dto_1 = require("./dto/Search-Input.dto");
const graphql_1 = require("@nestjs/graphql");
let CampaignService = class CampaignService {
    createQueryBuilder(arg0) {
        throw new Error('Method not implemented.');
    }
    constructor(campaignRepository) {
        this.campaignRepository = campaignRepository;
    }
    async getCampaignsStartingInNext24Hours() {
        const now = new Date(1);
        const tomorrow = new Date(1);
        tomorrow.setHours(now.getHours() + 24);
        return this.campaignRepository.find({
            where: {
                startDate: (0, typeorm_2.Between)(now, tomorrow),
            },
            relations: ['users'],
        });
    }
    async getCampaignsStartingNow() {
        const now = new Date();
        return this.campaignRepository.find({
            where: {
                startDate: (0, typeorm_2.LessThanOrEqual)(now),
                endDate: (0, typeorm_2.MoreThan)(now),
            },
            relations: ['users'],
        });
    }
    async searchCampaignsUsingFind(searchKey) {
        return await this.campaignRepository.find({
            where: [
                { description: (0, typeorm_2.ILike)(`%${searchKey}%`) },
                { name: (0, typeorm_2.ILike)(`%${searchKey}%`) },
                { status: (0, typeorm_2.ILike)(`%${searchKey}%`) },
            ],
        });
    }
    async searchCampaigns(searchKey) {
        return await this.campaignRepository
            .createQueryBuilder('campaign')
            .where('campaign.description ILIKE :searchKey', { searchKey: `%${searchKey}%` })
            .orWhere('campaign.name ILIKE :searchKey', { searchKey: `%${searchKey}%` })
            .orWhere('campaign.endDate::text ILIKE :searchKey', { searchKey: `%${searchKey}%` })
            .orWhere('campaign.startDate::text ILIKE :searchKey', { searchKey: `%${searchKey}%` })
            .orWhere('campaign.status::text ILIKE :searchKey', { searchKey: `%${searchKey}%` })
            .getMany();
    }
    async search(input) {
        const { name } = input;
        const campaigns = await this.campaignService
            .createQueryBuilder('campaign')
            .where('campaign.name ILIKE :name', { name: `%${name}%` })
            .orwhere('campaign.description ILIKE :description', { description: `%{description}%` })
            .orwhere('campaign.status ILIKE :status', { status: `%{status}%` })
            .orwehre('campaign.startDate ILIKE :startDate', { startDate: `%{startDate}%` })
            .orwehre('campaign.endDate ILIKE :endDate', { endDate: `%{endDate}%` })
            .getMany();
        const ads = await this.adService
            .createQueryBuilder('ad')
            .where('ad.name ILIKE :name', { name: `%${name}%` })
            .orwhere('ad.title ILIKE :title', { title: `%${process_1.title}%` })
            .orwehre('ad.status ILIKE :status', { status: `%${status}%` })
            .getMany();
        return [...campaigns, ...ads];
    }
    async findAll(pageMumber, reviewPrePage) {
        return this.campaignRepository.find({
            skip: 0,
            take: 12
        });
    }
    async findOne(id) {
        return this.campaignRepository.findOne({ where: { id } });
    }
    async create(createCampaignInput) {
        const campaign = this.campaignRepository.create(createCampaignInput);
        return this.campaignRepository.save(campaign);
    }
    async update(id, updateCampaignInput) {
        await this.campaignRepository.update(id, updateCampaignInput);
        return this.findOne(id);
    }
    async remove(id) {
        await this.campaignRepository.delete(id);
    }
};
exports.CampaignService = CampaignService;
__decorate([
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Search_Input_dto_1.SearchInput]),
    __metadata("design:returntype", Promise)
], CampaignService.prototype, "search", null);
exports.CampaignService = CampaignService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(campaign_entity_1.Campaign)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CampaignService);
//# sourceMappingURL=campaigns.service.js.map