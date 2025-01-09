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
exports.NotificationService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const notification_entity_1 = require("./entities/notification.entity");
const typeorm_2 = require("typeorm");
const firebase = require("firebase-admin");
const path = require("path");
const notification_token_entity_1 = require("./entities/notification-token.entity");
const graphql_1 = require("@nestjs/graphql");
firebase.initializeApp({
    credential: firebase.credential.cert(path.join(process.cwd(), 'src/config/firebase-admin-sdk.json')),
});
let NotificationService = class NotificationService {
    constructor(notificationsRepo, notificationTokenRepo) {
        this.notificationsRepo = notificationsRepo;
        this.notificationTokenRepo = notificationTokenRepo;
        this.acceptPushNotification = async (user, notification_dto) => {
            await this.notificationTokenRepo.update({ user: { id: user.id } }, {
                status: 'INACTIVE',
            });
            const notification_token = await this.notificationTokenRepo.save({
                user: user,
                device_type: notification_dto.device_type,
                notification_token: notification_dto.notification_token,
                status: 'ACTIVE',
            });
            return notification_token;
        };
        this.disablePushNotification = async (user, update_dto) => {
            try {
                await this.notificationTokenRepo.update({ user: { id: user.id }, device_type: update_dto.device_type }, {
                    status: 'INACTIVE',
                });
            }
            catch (error) {
                return error;
            }
        };
        this.getNotifications = async () => {
            return await this.notificationsRepo.find();
        };
        this.sendPush = async (user, title, body) => {
            try {
                const notification = await this.notificationTokenRepo.findOne({
                    where: { user: { id: user.id }, status: 'ACTIVE' },
                });
                if (notification) {
                    await this.notificationsRepo.save({
                        notification_token: notification,
                        title,
                        body,
                        status: 'ACTIVE',
                        created_by: user.username,
                    });
                    await firebase
                        .messaging()
                        .send({
                        notification: { title, body },
                        token: notification.notification_token,
                        android: { priority: 'high' },
                    })
                        .catch((error) => {
                        console.error(error);
                    });
                }
            }
            catch (error) {
                return error;
            }
        };
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, graphql_1.ObjectType)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notifications)),
    __param(1, (0, typeorm_1.InjectRepository)(notification_token_entity_1.NotificationToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], NotificationService);
//# sourceMappingURL=notification.service.js.map