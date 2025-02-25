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
var StripeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
const config_1 = require("@nestjs/config");
let StripeService = StripeService_1 = class StripeService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(StripeService_1.name);
        this.stripe = new stripe_1.default(this.configService.get('STRIPE_SECRET_KEY'), {});
    }
    async createCheckoutSession(priceId, customPrice, mode = 'payment') {
        try {
            let lineItems;
            if (priceId) {
                lineItems = [{ price: priceId, quantity: 1 }];
            }
            else if (customPrice) {
                const price = await this.stripe.prices.create({
                    unit_amount: customPrice.amount * 100,
                    currency: customPrice.currency,
                    product_data: { name: customPrice.name },
                });
                lineItems = [{ price: price.id, quantity: 1 }];
            }
            else {
                throw new Error('Either priceId or customPrice must be provided');
            }
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: mode,
                success_url: 'https://your-website.com/success',
                cancel_url: 'https://your-website.com/cancel',
                line_items: lineItems,
            });
            return session;
        }
        catch (error) {
            this.logger.error('Stripe API Error:', error);
            throw new Error(`Stripe API Error: ${error.message}`);
        }
    }
    handleWebhook(req, res) {
        const sig = req.headers['stripe-signature'];
        const endpointSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        }
        catch (err) {
            this.logger.error(` Webhook signature verification failed.`, err);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }
        switch (event.type) {
            case 'checkout.session.completed':
                this.logger.log(' Payment was successful:', event.data.object);
                const sessionId = event.data.object.id;
                this.stripe.checkout.sessions.listLineItems(sessionId)
                    .then(lineItems => {
                    this.logger.log(' Line Items:', lineItems);
                    res.json({ received: true, lineItems });
                })
                    .catch(error => {
                    this.logger.error(' Error fetching line items:', error);
                    res.status(500).json({ error: error.message });
                });
                console.log('localbarnd');
                return;
            case 'invoice.payment_succeeded':
            case 'invoice.payment_failed':
                const invoiceId = event.data.object.id;
                this.stripe.invoices.retrieve(invoiceId)
                    .then(invoice => {
                    this.logger.log(' Invoice Data:', invoice);
                    res.json({ received: true, invoice });
                })
                    .catch(error => {
                    this.logger.error('Error fetching invoice:', error);
                    res.status(500).json({ error: error.message });
                });
                return;
            default:
                this.logger.log(` Unhandled event type: ${event.type}`);
        }
        res.json({ received: true });
    }
    async createInvoice(customerId, items) {
        try {
            const lineItems = await Promise.all(items.map(async (item) => {
                const price = await this.stripe.prices.create({
                    unit_amount: item.amount * 100,
                    currency: item.currency,
                    product_data: { name: item.name },
                });
                return { price: price.id, quantity: item.quantity || 1 };
            }));
            const invoice = await this.stripe.invoices.create({
                customer: customerId,
                auto_advance: true,
                collection_method: 'charge_automatically',
            });
            for (const lineItem of lineItems) {
                await this.stripe.invoiceItems.create({
                    customer: customerId,
                    price: lineItem.price,
                    invoice: invoice.id,
                    quantity: lineItem.quantity,
                });
            }
            const finalizedInvoice = await this.stripe.invoices.finalizeInvoice(invoice.id);
            return finalizedInvoice;
        }
        catch (error) {
            this.logger.error(' Stripe API Error:', error);
            throw new Error(`Stripe API Error: ${error.message}`);
        }
    }
    async createCustomer(email, name) {
        try {
            const customer = await this.stripe.customers.create({
                email,
                name,
            });
            return {
                id: customer.id,
                email: customer.email,
                name: customer.name,
            };
        }
        catch (error) {
            this.logger.error(' Failed to create customer:', error);
            throw new Error(`Stripe API Error: ${error.message}`);
        }
    }
    async refundPayment(paymentIntentId) {
        try {
            const refund = await this.stripe.refunds.create({
                payment_intent: paymentIntentId,
            });
            if (!refund || !refund.id) {
                throw new Error('Refund operation failed. No ID returned.');
            }
            return refund;
        }
        catch (error) {
            this.logger.error('Stripe Refund Error:', error);
            throw new Error(`Stripe Refund Error: ${error.message}`);
        }
    }
    async createPaymentIntent(amount, currency, customerId) {
        try {
            const fixedAmount = Math.round(amount * 100);
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount: fixedAmount,
                currency: currency,
                customer: customerId,
                payment_method_types: ['card'],
            });
            return paymentIntent;
        }
        catch (error) {
            this.logger.error(` Stripe PaymentIntent Error: ${error.message}`, error);
            throw new Error(`Stripe API Error: ${error.message}`);
        }
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = StripeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StripeService);
//# sourceMappingURL=payment.service.js.map