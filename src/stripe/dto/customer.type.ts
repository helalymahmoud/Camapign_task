import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class StripeCustomerType {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;
}
