import { SalesService } from './sales.service';
export declare class SalesResolver {
    private readonly salesService;
    constructor(salesService: SalesService);
    getTotalSales(startDate: string, endDate: string): Promise<{
        totalRevenue: number;
        totalTransactions: number;
    }>;
    getAllTransactions(limit?: number, startingAfter?: string): Promise<import("stripe").Stripe.PaymentIntent[]>;
}
