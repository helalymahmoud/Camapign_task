"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const campaigns_module_1 = require("../campaigns/campaigns.module");
const tickets_entity_1 = require("./entities/tickets.entity");
const ticket_service_1 = require("./ticket.service");
const users_module_1 = require("../users/users.module");
const ticket_resolver_1 = require("./ticket.resolver");
const user_entity_1 = require("../users/entities/user.entity");
const campaign_entity_1 = require("../campaigns/entities/campaign.entity");
let TicketModule = class TicketModule {
};
exports.TicketModule = TicketModule;
exports.TicketModule = TicketModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tickets_entity_1.Ticket, user_entity_1.User, campaign_entity_1.Campaign]), users_module_1.UsersModule, campaigns_module_1.CampaignModule],
        providers: [ticket_service_1.TicketService, ticket_resolver_1.TicketResolver],
    })
], TicketModule);
//# sourceMappingURL=ticket.module.js.map