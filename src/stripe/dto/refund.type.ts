import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RefundType {
  @Field({ nullable: true })  
  id?: string;

  @Field({ nullable: true })
  amount?: number;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  currency?: string;
}
