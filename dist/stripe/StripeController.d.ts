import { Request, Response } from 'express';
import { StripeService } from './payment.service';
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    handleWebhook(req: Request, res: Response): Response<any, Record<string, any>>;
}
