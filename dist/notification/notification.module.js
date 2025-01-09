"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("./notification.service");
const typeorm_1 = require("@nestjs/typeorm");
const notification_entity_1 = require("./entities/notification.entity");
const notification_token_entity_1 = require("./entities/notification-token.entity");
const notification_resolver_1 = require("./notification.resolver");
const users_service_1 = require("../users/users.service");
const user_entity_1 = require("../users/entities/user.entity");
let NotificationModule = class NotificationModule {
};
exports.NotificationModule = NotificationModule;
exports.NotificationModule = NotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([notification_entity_1.Notifications, notification_token_entity_1.NotificationToken, user_entity_1.User])
        ],
        providers: [notification_service_1.NotificationService, notification_resolver_1.NotificationsResolver, users_service_1.UsersService,],
        exports: [notification_service_1.NotificationService, typeorm_1.TypeOrmModule]
    })
], NotificationModule);
//# sourceMappingURL=notification.module.js.map