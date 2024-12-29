import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
// import { LoginResponse } from './dto/login-response';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
@Resolver()
export class AuthResolver {
  verificationService: any;
  constructor(private readonly authService: AuthService) {}



  @Mutation(() => String)
  async Register(@Args('data') registerDto: RegisterDto): Promise<string> {
    return this.authService.register(registerDto);
  }

  @Mutation(() => String)
    // @UseGuards(JwtAuthGuard, RolesGuard)
  async Login(@Args('data') loginDto: LoginDto): Promise<string> {
    return this.authService.login(loginDto);

  }

  @Mutation(() => Boolean)
    async sendVerificationEmail(@Args('email') email: string): Promise<boolean> {
      return await this.verificationService.sendVerificationEmail(email);
    }

  @Mutation(() => Boolean)
    async verifyEmail(@Args('otp') otp: string): Promise<boolean> {
      return await this.verificationService.verifyEmail(otp);
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
