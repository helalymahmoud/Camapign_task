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
exports.Notifications = void 0;
const typeorm_1 = require("typeorm");
const notification_token_entity_1 = require("./notification-token.entity");
const graphql_1 = require("@nestjs/graphql");
let Notifications = class Notifications {
};
exports.Notifications = Notifications;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Notifications.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notification_token_entity_1.NotificationToken),
    (0, typeorm_1.JoinColumn)({ name: 'notification_token_id', referencedColumnName: 'id' }),
    (0, graphql_1.Field)(() => notification_token_entity_1.NotificationToken),
    __metadata("design:type", notification_token_entity_1.NotificationToken)
], Notifications.prototype, "notification_token", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notifications.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Notifications.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notifications.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 'ACTIVE',
    }),
    __metadata("design:type", String)
], Notifications.prototype, "status", void 0);
exports.Notifications = Notifications = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Notifications);
//# sourceMappingURL=notification.entity.js.map