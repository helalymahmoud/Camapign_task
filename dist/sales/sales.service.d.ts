import Stripe from 'stripe';
export declare class SalesService {
    private stripe;
    constructor();
    getTotalSales(startDate: string, endDate: string): Promise<{
        totalRevenue: number;
        totalTransactions: number;
    }>;
    getAllTransactions(limit?: number, startingAfter?: string): Promise<Stripe.PaymentIntent[]>;
}
