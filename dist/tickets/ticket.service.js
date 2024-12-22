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
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const campaign_entity_1 = require("../campaigns/entities/campaign.entity");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const tickets_entity_1 = require("./entities/tickets.entity");
let TicketService = class TicketService {
    constructor(ticketRepository, userRepository, campaignRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.campaignRepository = campaignRepository;
    }
    async findAll() {
        return this.ticketRepository.find({ relations: ['user', 'campaign'] });
    }
    async findOne(id) {
        return this.ticketRepository.findOne({ where: { id } });
    }
    async create(input) {
        const user = await this.userRepository.findOne({
            where: { userId: input.userId }
        });
        const campaign = await this.campaignRepository.findOne({
            where: { id: (input.campaignId) }
        });
        const ticket = this.ticketRepository.create({
            user,
            campaign,
            expirationDate: new Date(input.expirationDate),
        });
        return this.ticketRepository.save(ticket);
    }
    async update(id, updateTicketInput) {
        const Ticket = this.ticketRepository.update(id, updateTicketInput);
        return this.findOne(id);
    }
    async remove(id) {
        await this.ticketRepository.delete(id);
    }
};
exports.TicketService = TicketService;
exports.TicketService = TicketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tickets_entity_1.Ticket)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(campaign_entity_1.Campaign)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TicketService);
//# sourceMappingURL=ticket.service.js.map