import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class RoleDistribution {
  @Field()
  role: string;

  @Field(() => Int)
  count: number;
}
