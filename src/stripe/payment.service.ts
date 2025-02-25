import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { CustomPriceInput } from './dto/stripe.input';
import { StripeCustomerType } from './dto/customer.type';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private logger = new Logger(StripeService.name);

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'), {
      // apiVersion: '2023-10-16',
    });
  }



  async createCheckoutSession(
    priceId?: string,
    customPrice?: CustomPriceInput,
    mode: 'payment' | 'subscription' | 'setup' = 'payment',
  ): Promise<Stripe.Checkout.Session> {
    try {
      let lineItems;
      if (priceId) {
        lineItems = [{ price: priceId, quantity: 1 }];
      } else if (customPrice) {
        const price = await this.stripe.prices.create({
          unit_amount: customPrice.amount * 100,
          currency: customPrice.currency,
          product_data: { name: customPrice.name },
        });
        lineItems = [{ price: price.id, quantity: 1 }];
      } else {
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
    } catch (error) {
      this.logger.error('Stripe API Error:', error);
      throw new Error(`Stripe API Error: ${error.message}`);
    }
  } 


  handleWebhook(req: Request, res: Response) {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
  
    let event;
    try {
      event = this.stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
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




  async createInvoice(customerId: string, items: CustomPriceInput[]) {  // create invoice
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
    } catch (error) {
      this.logger.error(' Stripe API Error:', error);
      throw new Error(`Stripe API Error: ${error.message}`);
    }
  }



  async createCustomer(email: string, name: string): Promise<StripeCustomerType> {  // create عميل
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
    } catch (error) {
      this.logger.error(' Failed to create customer:', error); 
      throw new Error(`Stripe API Error: ${error.message}`);
    }
  }



  async refundPayment(paymentIntentId: string): Promise<Stripe.Refund> {    // money back 
    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: paymentIntentId,
      });
  
      if (!refund || !refund.id) {
        throw new Error('Refund operation failed. No ID returned.');
      }
  
      return refund;
    } catch (error) {
      this.logger.error('Stripe Refund Error:', error);
      throw new Error(`Stripe Refund Error: ${error.message}`); 
    }
  }

  

  async createPaymentIntent(amount: number, currency: string, customerId: string) {    //Payment Intent & 3D Secure
    try {
      const fixedAmount = Math.round(amount * 100);
  
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: fixedAmount,
        currency: currency,
        customer: customerId,
        payment_method_types: ['card'],
      });
  
      return paymentIntent;
    } catch (error) {
      this.logger.error(` Stripe PaymentIntent Error: ${error.message}`, error);
      throw new Error(`Stripe API Error: ${error.message}`);
    }
  }

}
  

  

