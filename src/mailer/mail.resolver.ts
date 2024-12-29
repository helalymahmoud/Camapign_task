import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MailService } from './mail.service';

@Resolver()
export class EmailResolver {
  constructor(private readonly mailservice: MailService) {}

  @Mutation(() => Boolean)
  async sendVerificationEmail(
    @Args('email') email: string,
    @Args('token') token: string,
  ): Promise<boolean> {
    try {
      await this.mailservice.sendVerificationEmail(email, token);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }
}
