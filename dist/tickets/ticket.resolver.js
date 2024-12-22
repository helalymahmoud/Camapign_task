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
exports.TicketResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const ticket_service_1 = require("./ticket.service");
const create_ticket_input_1 = require("./dto/create-ticket.input");
const tickets_entity_1 = require("./entities/tickets.entity");
let TicketResolver = class TicketResolver {
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    async Tickets() {
        const tickets = await this.ticketService.findAll();
        return tickets || [];
    }
    async Ticket(id) {
        return this.ticketService.findOne(id);
    }
    async createTicket(CreateTicketInput) {
        return this.ticketService.create(CreateTicketInput);
    }
    async updateTicket(id, updateTicketInput) {
        return this.ticketService.update(id, updateTicketInput);
    }
    async removeTicket(id) {
        await this.ticketService.remove(id);
        return true;
    }
};
exports.TicketResolver = TicketResolver;
__decorate([
    (0, graphql_1.Query)(() => [tickets_entity_1.Ticket]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketResolver.prototype, "Tickets", null);
__decorate([
    (0, graphql_1.Query)(() => tickets_entity_1.Ticket),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketResolver.prototype, "Ticket", null);
__decorate([
    (0, graphql_1.Mutation)(() => tickets_entity_1.Ticket),
    __param(0, (0, graphql_1.Args)('createTicketInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ticket_input_1.CreateTicketInput]),
    __metadata("design:returntype", Promise)
], TicketResolver.prototype, "createTicket", null);
__decorate([
    (0, graphql_1.Mutation)(() => tickets_entity_1.Ticket),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('updateTicketInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_ticket_input_1.CreateTicketInput]),
    __metadata("design:returntype", Promise)
], TicketResolver.prototype, "updateTicket", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketResolver.prototype, "removeTicket", null);
exports.TicketResolver = TicketResolver = __decorate([
    (0, graphql_1.Resolver)(() => tickets_entity_1.Ticket),
    __metadata("design:paramtypes", [ticket_service_1.TicketService])
], TicketResolver);
//# sourceMappingURL=ticket.resolver.js.map