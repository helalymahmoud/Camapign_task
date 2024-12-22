"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdInteractionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ads_entity_1 = require("../ads/entities/ads.entity");
const user_entity_1 = require("../users/entities/user.entity");
const ads_interaction_resolver_1 = require("./ads-interaction.resolver");
const ads_interaction_service_1 = require("./ads-interaction.service");
const ads_interaction_entity_1 = require("./ads-interaction.entity");
let AdInteractionModule = class AdInteractionModule {
};
exports.AdInteractionModule = AdInteractionModule;
exports.AdInteractionModule = AdInteractionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([ads_interaction_entity_1.AdInteraction, user_entity_1.User, ads_entity_1.Ad])],
        providers: [ads_interaction_service_1.AdInteractionService, ads_interaction_resolver_1.AdInteractionResolver],
        exports: [ads_interaction_service_1.AdInteractionService],
    })
], AdInteractionModule);
//# sourceMappingURL=ads-interaction.module.js.map