"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("./auth.service");
const auth_resolver_1 = require("./auth.resolver");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./jwt.strategy");
const roles_guard_1 = require("./roles.guard");
const user_entity_1 = require("../users/entities/user.entity");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
const users_module_1 = require("../users/users.module");
const passport_1 = require("@nestjs/passport");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule,
            users_module_1.UsersModule,
            passport_1.PassportModule,
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1d' },
            }),
        ],
        providers: [
            auth_service_1.AuthService,
            auth_resolver_1.AuthResolver,
            jwt_strategy_1.JwtStrategy,
            roles_guard_1.RolesGuard
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map