import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Stripe } from 'stripe';
import { ConfigService } from '@nestjs/config';
import { CreateProductInput } from './dto/product.dto';
import { ProductType } from './dto/product.type';
import { Product } from './Entity/product.entity';
import { credential } from 'firebase-admin';
import { threadId } from 'worker_threads';

@Injectable()
export class ProductService {
  private stripe: Stripe;
    userRepository: any;

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private configService: ConfigService, 
  ) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'), {
    //   apiVersion: '2023-10-16',
    });
  }

  async createProduct(input: CreateProductInput): Promise<ProductType> {
    const product = this.productRepository.create(input);
    const savedProduct = await this.productRepository.save(product);

    const stripeProduct = await this.stripe.products.create({
      name: savedProduct.name,
      description: savedProduct.description,
    });

    const stripePrice = await this.stripe.prices.create({
      unit_amount: Math.round(savedProduct.price * 100),
      currency: savedProduct.currency || 'usd',
      product: stripeProduct.id, 
    });

    savedProduct.stripeProductId = stripeProduct.id;
    savedProduct.stripePriceId = stripePrice.id;
    await this.productRepository.save(savedProduct);  
    console.log('');
    
    return savedProduct;
    
  } 


  async getProductsForUser(userId: string): Promise<Product[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    if (!user.stripeCustomerId) {
      const customer = await this.stripe.customers.create({
        email: user.email,
        name: user.name,
      });
  
      user.stripeCustomerId = customer.id;
      await this.userRepository.save(user);
    }
  
    const products = await this.productRepository.find();
    return products || []; 
  }
  
  
  
}
