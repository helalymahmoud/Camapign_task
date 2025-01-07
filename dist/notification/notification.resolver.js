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
const send_multiple_notifications_input_1 = require("./dto/send-multiple-notifications.input");
const send_notification_input_1 = require("./dto/send-notification.input");
const send_topic_notification_input_1 = require("./dto/send-topic-notification.input");
let NotificationResolver = class NotificationResolver {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async sendNotification(input) {
        await this.notificationService.sendNotification(input);
        return 'Notification sent successfully';
    }
    async sendMultipleNotifications(input) {
        await this.notificationService.sendNotificationsToMultipleTokens(input);
        return 'Notifications sent successfully';
    }
    async sendTopicNotification(input) {
        await this.notificationService.sendTopicNotification(input);
        return 'Topic notification sent successfully';
    }
};
exports.NotificationResolver = NotificationResolver;
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_notification_input_1.SendNotificationInput]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "sendNotification", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_multiple_notifications_input_1.SendMultipleNotificationsInput]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "sendMultipleNotifications", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_topic_notification_input_1.SendTopicNotificationInput]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "sendTopicNotification", null);
exports.NotificationResolver = NotificationResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationResolver);
//# sourceMappingURL=notification.resolver.js.map