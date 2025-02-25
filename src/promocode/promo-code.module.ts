import { Module } from '@nestjs/common';
import { PromoCodeService } from './promo-code.service';
import { PromoCodeResolver } from './promo-code.resolver';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], 
  providers: [PromoCodeService, PromoCodeResolver],
  exports: [PromoCodeService],
})
export class PromoCodeModule {}
 