import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { StripeService } from './payment.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('webhook')
  handleWebhook(@Req() req: Request, @Res() res: Response) {
    return this.stripeService.handleWebhook(req, res);
  }
}
