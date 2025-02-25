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
const graphql_subscriptions_1 = require("graphql-subscriptions");
let UsersService = class UsersService {
    constructor(userRepository, notificationService) {
        this.userRepository = userRepository;
        this.notificationService = notificationService;
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
        this.pubSub = new graphql_subscriptions_1.PubSub();
    }
    async createUser(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = this.userRepository.create({ ...data, password: hashedPassword });
        const savedUser = await this.userRepository.save(user);
        this.pubSub.publish('USER_CREATED', { userCreated: savedUser });
        return savedUser;
    }
    getPubSub() {
        return this.pubSub;
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
    async sendNotification(token, message) {
        try {
            if (!token || !message.notification || !message.notification.title || !message.notification.body) {
                throw new Error('Invalid token or message structure');
            }
            await firebase.messaging().send({
                notification: message.notification,
                token: token,
                android: {
                    priority: 'high',
                },
            });
            console.log('Notification sent successfully');
        }
        catch (error) {
            console.error('Error sending notification:', error.message);
            throw new Error(`Unable to send notification: ${error.message}`);
        }
    }
    async subscribeToTopic(tokens, topic) {
        try {
            if (!tokens.length || !topic) {
                throw new Error('Tokens or topic not provided');
            }
            const response = await firebase.messaging().subscribeToTopic(tokens, topic);
            console.log(`Successfully subscribed to topic: ${topic}`);
            console.log('Firebase response:', response);
        }
        catch (error) {
            console.error('Error subscribing to topic:', error.message);
            throw new Error(`Unable to subscribe to topic: ${error.message}`);
        }
    }
    async unsubscribeFromTopic(tokens, topic) {
        try {
            if (!tokens.length || !topic) {
                throw new Error('Tokens or topic not provided');
            }
            const response = await firebase.messaging().unsubscribeFromTopic(tokens, topic);
            console.log(`Successfully unsubscribed from topic: ${topic}`);
            console.log('Firebase response:', response);
        }
        catch (error) {
            console.error('Error unsubscribing from topic:', error.message);
            throw new Error(`Unable to unsubscribe from topic: ${error.message}`);
        }
    }
    async getUserRole() {
        return await this.userRepository
            .createQueryBuilder('user')
            .select('user.role', 'role')
            .addSelect('COUNT(user.id)', 'count')
            .groupBy('user.role')
            .getRawMany();
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