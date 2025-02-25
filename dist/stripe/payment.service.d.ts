import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { CustomPriceInput } from './dto/stripe.input';
import { StripeCustomerType } from './dto/customer.type';
export declare class StripeService {
    private readonly configService;
    private stripe;
    private logger;
    constructor(configService: ConfigService);
    createCheckoutSession(priceId?: string, customPrice?: CustomPriceInput, mode?: 'payment' | 'subscription' | 'setup'): Promise<Stripe.Checkout.Session>;
    handleWebhook(req: Request, res: Response): Response<any, Record<string, any>>;
    createInvoice(customerId: string, items: CustomPriceInput[]): Promise<Stripe.Response<Stripe.Invoice>>;
    createCustomer(email: string, name: string): Promise<StripeCustomerType>;
    refundPayment(paymentIntentId: string): Promise<Stripe.Refund>;
    createPaymentIntent(amount: number, currency: string, customerId: string): Promise<Stripe.Response<Stripe.PaymentIntent>>;
}
