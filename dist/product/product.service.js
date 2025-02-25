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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const stripe_1 = require("stripe");
const config_1 = require("@nestjs/config");
const product_entity_1 = require("./Entity/product.entity");
let ProductService = class ProductService {
    constructor(productRepository, configService) {
        this.productRepository = productRepository;
        this.configService = configService;
        this.stripe = new stripe_1.Stripe(this.configService.get('STRIPE_SECRET_KEY'), {});
    }
    async createProduct(input) {
        const product = this.productRepository.create(input);
        const savedProduct = await this.productRepository.save(product);
        const stripeProduct = await this.stripe.products.create({
            name: savedProduct.name,
            description: savedProduct.description,
        });
        const stripePrice = await this.stripe.prices.create({
            unit_amount: Math.round(savedProduct.price * 100),
            currency: savedProduct.currency || 'usd',
            product: stripeProduct.id,
        });
        savedProduct.stripeProductId = stripeProduct.id;
        savedProduct.stripePriceId = stripePrice.id;
        await this.productRepository.save(savedProduct);
        console.log('');
        return savedProduct;
    }
    async getProductsForUser(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        if (!user.stripeCustomerId) {
            const customer = await this.stripe.customers.create({
                email: user.email,
                name: user.name,
            });
            user.stripeCustomerId = customer.id;
            await this.userRepository.save(user);
        }
        const products = await this.productRepository.find();
        return products || [];
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], ProductService);
//# sourceMappingURL=product.service.js.map