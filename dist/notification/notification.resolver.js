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
exports.NotificationsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const users_service_1 = require("../users/users.service");
const notification_service_1 = require("./notification.service");
let NotificationsResolver = class NotificationsResolver {
    constructor(usersService, notification) {
        this.usersService = usersService;
        this.notification = notification;
    }
    async sendNotification(token, title, body) {
        const message = {
            notification: {
                title,
                body,
            },
            token,
        };
        await this.usersService.sendNotification(token, message);
        return 'Notification sent successfully';
    }
    async subscribeToTopic(tokens, topic) {
        await this.usersService.subscribeToTopic(tokens, topic);
        return `Subscribed to topic: ${topic}`;
    }
    async unsubscribeFromTopic(tokens, topic) {
        await this.usersService.unsubscribeFromTopic(tokens, topic);
        return `Unsubscribed from topic: ${topic}`;
    }
};
exports.NotificationsResolver = NotificationsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('token')),
    __param(1, (0, graphql_1.Args)('title')),
    __param(2, (0, graphql_1.Args)('body')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], NotificationsResolver.prototype, "sendNotification", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('tokens', { type: () => [String] })),
    __param(1, (0, graphql_1.Args)('topic')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], NotificationsResolver.prototype, "subscribeToTopic", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('tokens', { type: () => [String] })),
    __param(1, (0, graphql_1.Args)('topic')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], NotificationsResolver.prototype, "unsubscribeFromTopic", null);
exports.NotificationsResolver = NotificationsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        notification_service_1.NotificationService])
], NotificationsResolver);
//# sourceMappingURL=notification.resolver.js.map