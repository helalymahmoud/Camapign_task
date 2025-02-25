import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class SalesService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    });
  }

  async getTotalSales(startDate: string, endDate: string) {
    const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
    const endTimestamp = Math.floor(new Date(endDate).getTime()/ 1000);

    let hasMore = true;
    let totalRevenue = 0;
    let totalTransactions = 0;
    let startingAfter: string | undefined = undefined;

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
    console.log('login',endDate);
    

    return { totalRevenue, totalTransactions };
  }

  
    async getAllTransactions(limit = 100, startingAfter?: string) {
      try {
        const transactions = await this.stripe.paymentIntents.list({
          limit,
          starting_after: startingAfter,
        });
  
        return transactions.data;
      } catch (error) {
        console.error(` Failed to fetch transactions: ${error.message}`);
        throw new Error(`Stripe API Error: ${error.message}`);
      }
    }

  }
  


  

