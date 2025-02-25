import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { StripeResolver } from './payment.resolver';
import { StripeService } from './payment.service';
import { StripeController } from './StripeController';

@Module({
  imports: [ConfigModule],
  controllers: [StripeController],    
  providers: [StripeService,StripeResolver],
})
export class PaymentModule {}
