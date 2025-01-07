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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const schedule_1 = require("@nestjs/schedule");
let NotificationService = class NotificationService {
    constructor() {
    }
    async sendPushNotification(token, title, body) {
        try {
            const message = {
                token: token,
                notification: {
                    title: title,
                    body: body,
                },
            };
            await admin.messaging().send(message);
        }
        catch (error) {
            console.error('Error sending notification:', error);
        }
    }
    async sendDailyNotifications() {
        const userTokens = await this.getUserTokens();
        userTokens.forEach(async (token) => {
            await this.sendPushNotification(token, 'Campaign Reminder', 'Your campaign starts tomorrow!');
        });
    }
    async getUserTokens() {
        return ['user-token-1', 'user-token-2', 'user-token-3'];
    }
};
exports.NotificationService = NotificationService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_2AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationService.prototype, "sendDailyNotifications", null);
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], NotificationService);
//# sourceMappingURL=notification.service.js.map