import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { SalesService } from './sales.service';
import { SalesSummaryType } from './input/sales-summary.type';
import { TransactionType } from './input/TransactionType';
import { lutimes } from 'fs';
import { In } from 'typeorm';

@Resolver()
export class SalesResolver {
  constructor(private readonly salesService: SalesService) {}

  @Query(() => SalesSummaryType)
  async getTotalSales(
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string
  ) {
    return this.salesService.getTotalSales(startDate, endDate);
  }

  @Query(() => [TransactionType]) 
  async getAllTransactions(
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
    @Args('startingAfter', { nullable: true }) startingAfter?: string,
  ) {
    return this.salesService.getAllTransactions(limit ?? 100, startingAfter);
  }

  
}


