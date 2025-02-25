import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field({ defaultValue: 'usd' })
  currency: string;
}
