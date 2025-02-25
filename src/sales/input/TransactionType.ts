import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TransactionType {
  @Field()
  id: string;

  @Field()
  status: string;

  @Field(() => Int)
  amount: number;

  @Field(() => Int)
  amount_received: number;

  @Field()
  currency: string;

  @Field()
  created: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  customer?: string;

  @Field({ nullable: true })
  receipt_url?: string;
}
