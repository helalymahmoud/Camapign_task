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
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const users_service_1 = require("./users.service");
const user_entity_1 = require("./entities/user.entity");
const update_user_dto_1 = require("./dto/update-user.dto");
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const role_guard_1 = require("../auth/guards/role.guard");
const update_notification_input_1 = require("../notification/dto/update-notification.input");
const notification_dto_1 = require("../notification/dto/notification.dto");
let UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async Users(_currentUser) {
        const users = await this.usersService.findAll();
        console.log('Users:', users);
        return users || [];
    }
    async User(_currentUser, id) {
        return this.usersService.findOne(id);
    }
    async createUser(_currentUser, name, email, password) {
        return await this.usersService.createUser({ name, email, password });
    }
    async updateUser(_CurrentUser, id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    async updatePassword(_CurrentUser, userId, newPassword) {
        await this.usersService.updatePassword(userId, newPassword);
        return true;
    }
    async removeUser(_CurrentUser, id) {
        await this.usersService.remove(id);
        return true;
    }
    async enablePush(userId, notificationDto) {
        await this.usersService.enablePush(userId, notificationDto);
        return 'Push notifications enabled successfully';
    }
    async disablePush(userId, updateNotificationDto) {
        await this.usersService.disablePush(userId, updateNotificationDto);
        return 'Push notifications disabled successfully';
    }
};
exports.UsersResolver = UsersResolver;
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard, jwt_auth_guard_1.GqlAuthGuard),
    (0, roles_decorator_1.Roles)('user', 'admin'),
    (0, graphql_1.Query)(() => [user_entity_1.User]),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "Users", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard, jwt_auth_guard_1.GqlAuthGuard),
    (0, roles_decorator_1.Roles)('user', 'admin'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "User", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard, jwt_auth_guard_1.GqlAuthGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('name')),
    __param(2, (0, graphql_1.Args)('email')),
    __param(3, (0, graphql_1.Args)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String, String, String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard, jwt_auth_guard_1.GqlAuthGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('id')),
    __param(2, (0, graphql_1.Args)('updateUserDto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard, jwt_auth_guard_1.GqlAuthGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('userId')),
    __param(2, (0, graphql_1.Args)('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String, String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updatePassword", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard, jwt_auth_guard_1.GqlAuthGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "removeUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard, jwt_auth_guard_1.GqlAuthGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __param(1, (0, graphql_1.Args)('notificationDto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, notification_dto_1.NotificationDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "enablePush", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard, jwt_auth_guard_1.GqlAuthGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __param(1, (0, graphql_1.Args)('updateNotificationDto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_notification_input_1.UpdateNotificationDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "disablePush", null);
exports.UsersResolver = UsersResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.User),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
//# sourceMappingURL=users.resolver.js.map