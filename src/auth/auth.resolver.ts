import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
@Resolver()
export class AuthResolver {
  verificationService: any;
  constructor(private readonly authService: AuthService) {}


  @Mutation(() => String, { description: 'Register a new user' })
  async register(@Args('data') registerDto: RegisterDto): Promise<string> {
  const { message } = await this.authService.register(registerDto);
  return message ;
}



  @Mutation(() => Boolean, { description: 'Verify email with OTP' })
  async verifyOtp(
    @Args('email') email: string,
    @Args('otp') otp: string,
  ): Promise<boolean> {
    return this.authService.verifyOtp(email, otp);
  }


  
  @Mutation(() => String, { description: 'Login and return JWT token' })
  async login(@Args('data') loginDto: LoginDto): Promise<string> {
    const { token } = await this.authService.login(loginDto);
    return token;
  }

 
@Mutation(() => String, { description: 'Send reset password link' })
async sendResetPasswordLink(@Args('email') email: string): Promise<string> {
  const response = await this.authService.sendResetPasswordLink(email);
  return response.message;
}

@Mutation(() => String, { description: 'Reset password using token' })
async resetPassword(
  @Args('token') token: string,
  @Args('newPassword') newPassword: string,
): Promise<string> {
  const response = await this.authService.resetPassword(token, newPassword);
  
  return response.message;
}



}
