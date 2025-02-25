import { ProductService } from './product.service';
import { CreateProductInput } from './dto/product.dto';
import { ProductType } from './dto/product.type';
export declare class ProductResolver {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(input: CreateProductInput): Promise<ProductType>;
    products(userId: string): Promise<ProductType[]>;
}
