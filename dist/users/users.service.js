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
let UsersService = class UsersService {
    findById(id) {
        throw new Error('Method not implemented.');
    }
    constructor(userRepository) {
        this.userRepository = userRepository;
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
    async validateUser(email, password) {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        return user;
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
    async create(createUserDto) {
        const { name, email, password, role } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ name, email, password: hashedPassword, role });
        return this.userRepository.save(user);
    }
    async update(id, UpdateUserDto) {
        await this.userRepository.update(id, UpdateUserDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.userRepository.delete(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map