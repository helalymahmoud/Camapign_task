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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../users/entities/user.entity");
const mail_service_1 = require("../mailer/mail.service");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    authenticate(token) {
        throw new Error('Method not implemented.');
    }
    constructor(userRepository, mailerService, jwtService) {
        this.userRepository = userRepository;
        this.mailerService = mailerService;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const { name, email, password } = registerDto;
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new common_1.ConflictException('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date();
        otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 10);
        const user = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            role: 'User',
            otp,
            otpExpiresAt,
        });
        await this.userRepository.save(user);
        const subject = 'Verify Your Email';
        const text = `Your verification OTP is: ${otp}`;
        const html = `<p>Your verification OTP is:</p><h3>${otp}</h3><p>This OTP is valid for 10 minutes.</p>`;
        await this.mailerService.sendMail(email, subject, text, html);
        return {
            message: 'Registration successful. Please verify your email using the OTP sent to your email address.',
        };
    }
    async verifyOtp(email, otp) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (!user.otp || user.otp !== otp) {
            throw new common_1.BadRequestException('Invalid or expired OTP');
        }
        if (user.otpExpiresAt < new Date()) {
            throw new common_1.BadRequestException('OTP has expired');
        }
        user.otp = null;
        user.otpExpiresAt = null;
        await this.userRepository.save(user);
        return true;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.BadRequestException('Invalid email or password');
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new common_1.BadRequestException('Invalid email or password');
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = this.jwtService.sign(payload);
        return { token };
    }
    async sendResetPasswordLink(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user)
            throw new common_1.BadRequestException('User with given email does not exist');
        user.resetPasswordToken = (0, crypto_1.randomBytes)(32).toString('hex');
        user.resetPasswordExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
        await this.userRepository.save(user);
        const resetPasswordLink = `http://localhost:3001/reset-password/${user.resetPasswordToken}`;
        await this.mailerService.sendMail(email, 'Reset Your Password', `Reset your password using this link: ${resetPasswordLink}`, `<p>Reset your password using this link:</p><a href="${resetPasswordLink}">Reset Password</a>`);
        return { message: 'Password reset link sent to your email, please check your inbox' };
    }
    async resetPassword(token, newPassword) {
        const user = await this.userRepository.findOne({ where: { resetPasswordToken: token } });
        if (!user || user.resetPasswordExpiresAt < new Date()) {
            throw new common_1.BadRequestException('Invalid or expired reset token');
        }
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpiresAt = null;
        await this.userRepository.save(user);
        return { message: 'Password successfully reset' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mail_service_1.MailService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map