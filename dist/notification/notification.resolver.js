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
exports.NotificationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const notification_service_1 = require("./notification.service");
let NotificationResolver = class NotificationResolver {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async sendNotification(fcmToken, title, body) {
        await this.notificationService.sendPushNotification(fcmToken, title, body);
        return 'Notification sent!';
    }
};
exports.NotificationResolver = NotificationResolver;
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('fcmToken')),
    __param(1, (0, graphql_1.Args)('title')),
    __param(2, (0, graphql_1.Args)('body')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "sendNotification", null);
exports.NotificationResolver = NotificationResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationResolver);
//# sourceMappingURL=notification.resolver.js.map