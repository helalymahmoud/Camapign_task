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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const notification_service_1 = require("../notification/notification.service");
const firebase = require("firebase-admin");
let UsersService = class UsersService {
    unsubscribeFromTopic(tokens, topic) {
        throw new Error('Method not implemented.');
    }
    subscribeToTopic(tokens, topic) {
        throw new Error('Method not implemented.');
    }
    getUser(username) {
        throw new Error('Method not implemented.');
    }
    findById(id) {
        throw new Error('Method not implemented.');
    }
    constructor(userRepository, notificationService) {
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.updateProfile = async (user_id, update_dto) => {
            try {
                const user = await this.userRepository.findOne({
                    where: { id: user_id },
                });
                const updated_user = {
                    ...user,
                    username: update_dto.username,
                    email: update_dto.email,
                };
                const saved_user = await this.userRepository.save(updated_user);
                if (saved_user) {
                    await this.notificationService.sendPush(updated_user, 'Profiie update', 'Your Profile have been updated successfully')
                        .catch((e) => {
                        console.log('Error sending push notification', e);
                    });
                }
                return saved_user;
            }
            catch (error) {
                return error;
            }
        };
        this.enablePush = async (user_id, update_dto) => {
            const user = await this.userRepository.findOne({
                where: { id: user_id },
            });
            return await this.notificationService.acceptPushNotification(user, update_dto);
        };
        this.disablePush = async (user_id, update_dto) => {
            const user = await this.userRepository.findOne({
                where: { id: user_id },
            });
            return await this.notificationService.disablePushNotification(user, update_dto);
        };
        this.getPushNotifications = async () => {
            return await this.notificationService.getNotifications();
        };
    }
    async createUser(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = this.userRepository.create({
            ...data,
            password: hashedPassword,
        });
        return await this.userRepository.save(user);
    }
    async findByEmail(email) {
        return await this.userRepository.findOne({ where: { email } });
    }
    async updatePassword(userId, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.userRepository.update(userId, { password: hashedPassword });
        return await this.userRepository.findOne({ where: { userId } });
    }
    async findAll() {
        return this.userRepository.find({ relations: ['joinedCampaigns'] });
    }
    async findOne(id) {
        return this.userRepository.findOne({ where: { id }, relations: ['joinedCampaigns'] });
    }
    async update(id, UpdateUserDto) {
        await this.userRepository.update(id, UpdateUserDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.userRepository.delete(id);
    }
    create(user) {
        return this.userRepository.save(user);
    }
    async sendNotification(token, message) {
        try {
            await firebase.messaging().send({
                notification: message.notification,
                token: token,
                android: {
                    priority: 'high',
                },
            });
        }
        catch (error) {
            console.error('Error sending notification:', error);
            throw new Error('Unable to send notification');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        notification_service_1.NotificationService])
], UsersService);
//# sourceMappingURL=users.service.js.map