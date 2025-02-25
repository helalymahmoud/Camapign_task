import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/product.dto';
import { ProductType } from './dto/product.type';


@Resolver(() => ProductType)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => ProductType) 
  async createProduct(@Args('input') input: CreateProductInput): Promise<ProductType> {
    return this.productService.createProduct(input);
  }


  @Query(() => [ProductType])
  async products(@Args('userId') userId: string): Promise<ProductType[]> {
    return await this.productService.getProductsForUser(userId);
  }

  
  

  
}
