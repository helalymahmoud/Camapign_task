"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
let NotificationService = class NotificationService {
    async sendNotification(payload) {
        const message = {
            notification: {
                title: payload.title,
                body: payload.body,
                icon: payload.icon,
            },
            token: payload.token,
        };
        return await admin.messaging().send(message);
    }
    async sendNotificationsToMultipleTokens(payload) {
        const message = {
            notification: {
                title: payload.title,
                body: payload.body,
                icon: payload.icon,
            },
            tokens: payload.tokens,
        };
    }
    async sendTopicNotification(payload) {
        const message = {
            notification: {
                title: payload.title,
                body: payload.body,
                icon: payload.icon,
            },
            topic: payload.topic,
        };
        return await admin.messaging().send(message);
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)()
], NotificationService);
//# sourceMappingURL=notification.service.js.map