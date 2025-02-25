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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
let SalesService = class SalesService {
    constructor() {
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {});
    }
    async getTotalSales(startDate, endDate) {
        const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
        const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000);
        let hasMore = true;
        let totalRevenue = 0;
        let totalTransactions = 0;
        let startingAfter = undefined;
        while (hasMore) {
            const payments = await this.stripe.paymentIntents.list({
                limit: 100,
                created: { gte: startTimestamp, lte: endTimestamp },
                expand: ['data.charges'],
                starting_after: startingAfter,
            });
            payments.data.forEach((payment) => {
                if (payment.status === 'succeeded') {
                    totalRevenue += payment.amount_received / 100;
                    totalTransactions++;
                }
            });
            hasMore = payments.has_more;
            startingAfter = hasMore ? payments.data[payments.data.length - 1].id : undefined;
        }
        console.log('login', endDate);
        return { totalRevenue, totalTransactions };
    }
    async getAllTransactions(limit = 100, startingAfter) {
        try {
            const transactions = await this.stripe.paymentIntents.list({
                limit,
                starting_after: startingAfter,
            });
            return transactions.data;
        }
        catch (error) {
            console.error(` Failed to fetch transactions: ${error.message}`);
            throw new Error(`Stripe API Error: ${error.message}`);
        }
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SalesService);
//# sourceMappingURL=sales.service.js.map