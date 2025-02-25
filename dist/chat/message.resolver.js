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
exports.MessageResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const message_service_1 = require("./message.service");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const message_entity_1 = require("./Entity/message.entity");
const pubSub = new graphql_subscriptions_1.PubSub();
let MessageResolver = class MessageResolver {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async sendMessage(senderId, receiverId, content) {
        const message = await this.messageService.createMessage(senderId, receiverId, content);
        pubSub.publish('MESSAGE_SENT', { messageSent: message });
        return message;
    }
    messageSent(receiverId) {
        return pubSub.asyncIterableIterator('MESSAGE_SENT');
    }
};
exports.MessageResolver = MessageResolver;
__decorate([
    (0, graphql_1.Mutation)(() => message_entity_1.Message),
    __param(0, (0, graphql_1.Args)('senderId')),
    __param(1, (0, graphql_1.Args)('receiverId')),
    __param(2, (0, graphql_1.Args)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "sendMessage", null);
__decorate([
    (0, graphql_1.Subscription)(() => message_entity_1.Message, {
        filter: (payload, variables) => {
            return (payload.messageSent.receiverId === variables.receiverId ||
                payload.messageSent.senderId === variables.receiverId);
        },
    }),
    __param(0, (0, graphql_1.Args)('receiverId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessageResolver.prototype, "messageSent", null);
exports.MessageResolver = MessageResolver = __decorate([
    (0, graphql_1.Resolver)(() => message_entity_1.Message),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageResolver);
//# sourceMappingURL=message.resolver.js.map