import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PromoCodeService } from './promo-code.service';
import { PromoCodeType } from './dto/promo-code.type';

@Resolver(() => PromoCodeType)
export class PromoCodeResolver {
  constructor(private readonly promoCodeService: PromoCodeService) {}

  @Mutation(() => PromoCodeType)
  async createPromoCode( 
    @Args('couponId') couponId: string
  ): Promise<PromoCodeType> {
    return await this.promoCodeService.createPromoCode(couponId);
  } 
}
