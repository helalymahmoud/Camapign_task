import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MailService } from './mail.service';

@Resolver()
export class UserResolver {
  constructor(private readonly mailService: MailService) {}

  @Mutation(() => Boolean)
  async sendWelcomeEmail(@Args('email') email: string, @Args('name') name: string): Promise<boolean> {
    try {
      await this.mailService.sendWelcomeEmail(email, name);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  } 
}
 