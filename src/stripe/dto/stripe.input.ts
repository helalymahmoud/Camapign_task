import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CustomPriceInput {
  @Field(() => Float)
  amount: number;

  @Field()
  currency: string;

  @Field()
  name: string;
  quantity: number;
}
