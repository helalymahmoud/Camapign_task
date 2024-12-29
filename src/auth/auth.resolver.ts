import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
@Resolver()
export class AuthResolver {
  verificationService: any;
  constructor(private readonly authService: AuthService) {}



  @Mutation(() => String)
  async Register(@Args('data') registerDto: RegisterDto): Promise<string> {
    return this.authService.register(registerDto);
  }

  @Mutation(() => String)
  async Login(@Args('data') loginDto: LoginDto): Promise<string> {
    return this.authService.login(loginDto);
    
  }

  @Mutation(() => Boolean)
    async sendVerificationEmail(@Args('email') email: string): Promise<boolean> {
      return await this.verificationService.sendVerificationEmail(email);
    }

  @Mutation(() => Boolean)
    async verifyEmail(@Args('token') token: string): Promise<boolean> {
      return await this.verificationService.verifyEmail(token);
    } 

  @Mutation(() => String)
  async forgetPassword(@Args('email') email: string): Promise<string> {
    return this.authService.HandleForgetPassword(email);
  }

  @Mutation(() => String)
  async resetPassword(
    @Args('token') token: string,
    @Args('newPassword') newPassword: string,
  ): Promise<string> {
    return this.authService.HandleResetPassword(token, newPassword);
  }


}
