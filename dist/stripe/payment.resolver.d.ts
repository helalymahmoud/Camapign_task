import { CustomPriceInput } from './dto/stripe.input';
import { StripeService } from './payment.service';
import { StripeCustomerType } from './dto/customer.type';
import { RefundType } from './dto/refund.type';
import { PaymentIntentType } from './dto/PaymentIntent.Type';
export declare class StripeResolver {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    createCheckoutSession(priceId?: string, customPrice?: CustomPriceInput, mode?: 'payment' | 'subscription' | 'setup'): Promise<string>;
    createInvoice(customerId: string, items: CustomPriceInput[]): Promise<string>;
    createCustomer(email: string, name: string): Promise<StripeCustomerType>;
    refundPayment(paymentIntentId: string): Promise<RefundType>;
    createPaymentIntent(amount: number, currency: string, customerId: string): Promise<PaymentIntentType>;
}
