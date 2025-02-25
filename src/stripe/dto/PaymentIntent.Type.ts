import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PaymentIntentType {
  @Field()
  id: string;

  @Field()
  amount: number;

  @Field()
  currency: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  client_secret?: string;
}
 