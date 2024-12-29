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
exports.EmailResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const mail_service_1 = require("./mail.service");
let EmailResolver = class EmailResolver {
    constructor(mailservice) {
        this.mailservice = mailservice;
    }
    async sendVerificationEmail(email, token) {
        try {
            await this.mailservice.sendVerificationEmail(email, token);
            return true;
        }
        catch (error) {
            console.error('Failed to send email:', error);
            return false;
        }
    }
};
exports.EmailResolver = EmailResolver;
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmailResolver.prototype, "sendVerificationEmail", null);
exports.EmailResolver = EmailResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], EmailResolver);
//# sourceMappingURL=mail.resolver.js.map