import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SearchInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  status: string;

  @Field({ nullable: true })
  startDate: string;

  @Field({ nullable: true })
  endDate: string;

  @Field({ nullable: true })
  title: string; 

  @Field()
  declare
}
