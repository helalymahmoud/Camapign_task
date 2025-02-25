import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CustomPriceInput } from './dto/stripe.input';
import { StripeService } from './payment.service';
import { StripeCustomerType } from './dto/customer.type';
import { RefundType } from './dto/refund.type';
import { PaymentIntentType } from './dto/PaymentIntent.Type';

@Resolver()
export class StripeResolver {
  constructor(private readonly stripeService: StripeService) {}



  @Mutation(() => String)
  async createCheckoutSession(
    @Args('priceId', { nullable: true }) priceId?: string,
    @Args('customPrice', { type: () => CustomPriceInput, nullable: true }) customPrice?: CustomPriceInput,
    @Args('mode', { type: () => String, defaultValue: 'payment' }) mode?: 'payment' | 'subscription' | 'setup',
  ): Promise<string> {
    try {
      console.log('Received GraphQL Request:', { priceId, customPrice, mode });

      const session = await this.stripeService.createCheckoutSession(priceId, customPrice, mode);
      
      console.log('Returning Checkout URL:', session.url);
      
      return session.url;
    } catch (error) {
      console.error('GraphQL Error:', error);
      throw new Error(`GraphQL Error: ${error.message}`);
    }
  }


  @Mutation(() => String)
async createInvoice(
  @Args('customerId') customerId: string,
  @Args({ name: 'items', type: () => [CustomPriceInput] }) items: CustomPriceInput[],
): Promise<string> {
  try {
    const invoice = await this.stripeService.createInvoice(customerId, items);
    return `Invoice created successfully: ${invoice.id}`;
  } catch (error) {
    throw new Error(error.message);
  }
}




@Mutation(() => StripeCustomerType)
async createCustomer(
  @Args('email') email: string,
  @Args('name') name: string,
): Promise<StripeCustomerType> {
  return this.stripeService.createCustomer(email, name);
}


@Mutation(() => RefundType)
async refundPayment(
  @Args('paymentIntentId') paymentIntentId: string,
): Promise<RefundType> {
  return this.stripeService.refundPayment(paymentIntentId);
}


@Mutation(() => PaymentIntentType)
async createPaymentIntent(
  @Args('amount') amount: number,
  @Args('currency') currency: string,
  @Args('customerId') customerId: string,
): Promise<PaymentIntentType> {
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






}
