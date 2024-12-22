import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  authenticationService: any;
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret'
    });
  }
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authenticationService.getAuthenticatedUser(
      email,
      password,
    );
    if (!user) throw new UnauthorizedException();
    return user; 
  }
  
  
}
