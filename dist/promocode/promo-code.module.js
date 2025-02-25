"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromoCodeModule = void 0;
const common_1 = require("@nestjs/common");
const promo_code_service_1 = require("./promo-code.service");
const promo_code_resolver_1 = require("./promo-code.resolver");
const config_1 = require("@nestjs/config");
let PromoCodeModule = class PromoCodeModule {
};
exports.PromoCodeModule = PromoCodeModule;
exports.PromoCodeModule = PromoCodeModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [promo_code_service_1.PromoCodeService, promo_code_resolver_1.PromoCodeResolver],
        exports: [promo_code_service_1.PromoCodeService],
    })
], PromoCodeModule);
//# sourceMappingURL=promo-code.module.js.map