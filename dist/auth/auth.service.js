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
let AuthService = class AuthService {
    constructor(jwtService, userRepository, mailerService) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.mailerService = mailerService;
    }
    async register(registerDto) {
        const { name, email, password } = registerDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            role: 'User',
        });
        await this.userRepository.save(user);
        this.sendVerificationEmail(email);
        return this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user)
            throw new common_1.BadRequestException('invalid email or paasword');
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!password)
            throw new common_1.BadRequestException('invalid email or paasword');
        return user;
    }
    async sendVerificationEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const verificationToken = uuidv4();
        user.verificationToken = verificationToken;
        await this.userRepository.save(user);
        await this.mailService.sendMail({
            to: user.email,
            subject: 'Verify Your Email',
            html: `<h1>Hello ${user.name}</h1><p>Verify your email using the token: ${verificationToken}</p>`,
        });
        return true;
    }
    async HandleForgetPassword(email) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const token = this.jwtService.sign({ id: user.id }, { expiresIn: '1h' });
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        await this.mailService.sendMail({
            to: email,
            subject: 'Reset Password',
            text: `Click this link to reset your password: ${resetLink}`,
        });
        return 'Password reset link has been sent to your email';
    }
    async HandleResetPassword(token, newPassword) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.userService.findById(payload.id);
            if (!user) {
                throw new Error('Invalid token');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await this.userService.updatePassword(user.id, hashedPassword);
            return 'Password has been reset successfully';
        }
        catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository,
        mail_service_1.MailService])
], AuthService);
function uuidv4() {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=auth.service.js.map