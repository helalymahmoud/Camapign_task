import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SalesSummaryType {
  @Field()
  totalRevenue: number;

  @Field()
  totalTransactions: number;
}
