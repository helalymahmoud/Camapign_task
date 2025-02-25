import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType() 
export class ProductType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field()  
  currency: string;


  @Field({ nullable: true }) 
  isActive?: boolean;


  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
