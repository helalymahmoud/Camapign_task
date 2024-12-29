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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let MailService = class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'kapewo4906@pixdd.com',
            port: 587,
            secure: false,
            auth: {
                user: 'mahmoud.hisham.7370@gmail.cmom',
                pass: '73707370mahmoud',
            },
        });
    }
    async sendVerificationEmail(to, token) {
        const verificationUrl = `http://your-frontend-url.com/verify?token=${token}`;
        const mailOptions = {
            from: '"Your App Name" <kapewo4906@pixdd.com>',
            to: 'me@me.com',
            subject: 'Stockist interest form',
            text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
            html: `<p>Please verify your email by clicking on the following link:</p><a href="${verificationUrl}">Verify Email</a>`,
        };
        return await this.transporter.sendMail(mailOptions);
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
//# sourceMappingURL=mail.service.js.map