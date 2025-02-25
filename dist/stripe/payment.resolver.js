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
exports.StripeResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const stripe_input_1 = require("./dto/stripe.input");
const payment_service_1 = require("./payment.service");
const customer_type_1 = require("./dto/customer.type");
const refund_type_1 = require("./dto/refund.type");
const PaymentIntent_Type_1 = require("./dto/PaymentIntent.Type");
let StripeResolver = class StripeResolver {
    constructor(stripeService) {
        this.stripeService = stripeService;
    }
    async createCheckoutSession(priceId, customPrice, mode) {
        try {
            console.log('Received GraphQL Request:', { priceId, customPrice, mode });
            const session = await this.stripeService.createCheckoutSession(priceId, customPrice, mode);
            console.log('Returning Checkout URL:', session.url);
            return session.url;
        }
        catch (error) {
            console.error('GraphQL Error:', error);
            throw new Error(`GraphQL Error: ${error.message}`);
        }
    }
    async createInvoice(customerId, items) {
        try {
            const invoice = await this.stripeService.createInvoice(customerId, items);
            return `Invoice created successfully: ${invoice.id}`;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async createCustomer(email, name) {
        return this.stripeService.createCustomer(email, name);
    }
    async refundPayment(paymentIntentId) {
        return this.stripeService.refundPayment(paymentIntentId);
    }
    async createPaymentIntent(amount, currency, customerId) {
        const paymentIntent = await this.stripeService.createPaymentIntent(amount, currency, customerId);
        if (!paymentIntent || !paymentIntent.id) {
            throw new Error(' PaymentIntent creation failed. No ID returned from Stripe.');
        }
        return {
            id: paymentIntent.id,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: paymentIntent.status,
            client_secret: paymentIntent.client_secret || '',
        };
    }
};
exports.StripeResolver = StripeResolver;
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('priceId', { nullable: true })),
    __param(1, (0, graphql_1.Args)('customPrice', { type: () => stripe_input_1.CustomPriceInput, nullable: true })),
    __param(2, (0, graphql_1.Args)('mode', { type: () => String, defaultValue: 'payment' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, stripe_input_1.CustomPriceInput, String]),
    __metadata("design:returntype", Promise)
], StripeResolver.prototype, "createCheckoutSession", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('customerId')),
    __param(1, (0, graphql_1.Args)({ name: 'items', type: () => [stripe_input_1.CustomPriceInput] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], StripeResolver.prototype, "createInvoice", null);
__decorate([
    (0, graphql_1.Mutation)(() => customer_type_1.StripeCustomerType),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StripeResolver.prototype, "createCustomer", null);
__decorate([
    (0, graphql_1.Mutation)(() => refund_type_1.RefundType),
    __param(0, (0, graphql_1.Args)('paymentIntentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StripeResolver.prototype, "refundPayment", null);
__decorate([
    (0, graphql_1.Mutation)(() => PaymentIntent_Type_1.PaymentIntentType),
    __param(0, (0, graphql_1.Args)('amount')),
    __param(1, (0, graphql_1.Args)('currency')),
    __param(2, (0, graphql_1.Args)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], StripeResolver.prototype, "createPaymentIntent", null);
exports.StripeResolver = StripeResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [payment_service_1.StripeService])
], StripeResolver);
//# sourceMappingURL=payment.resolver.js.map