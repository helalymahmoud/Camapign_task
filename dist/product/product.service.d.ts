import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CreateProductInput } from './dto/product.dto';
import { ProductType } from './dto/product.type';
import { Product } from './Entity/product.entity';
export declare class ProductService {
    private productRepository;
    private configService;
    private stripe;
    userRepository: any;
    constructor(productRepository: Repository<Product>, configService: ConfigService);
    createProduct(input: CreateProductInput): Promise<ProductType>;
    getProductsForUser(userId: string): Promise<Product[]>;
}
