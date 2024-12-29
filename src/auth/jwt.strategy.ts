import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  authenticationService: any;
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your_secret_key',
    }); 
  }


  async validateemail(email: string, password: string): Promise<any> {
    const user = await this.authService.verifyEmail(
      email,);

    if (!user) throw new UnauthorizedException();
    return user; 
  }
  async validatepassword (email: string, password: string): Promise<any> {
    const user = await this.authService.verifyEmail(
      password)

      if (!user) throw new UnauthorizedException();
      return user; 

    }

  
}
