import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersesrvice:UsersService,
    private configservice:ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),   
      ignoreExpiration: false,  
      secretOrKey: process.env.JWT_SECRET || 'secretKey',   
    });
  }

  async validate(payload: any) {
    const {username} =payload
    const user :User = await this.usersesrvice.getUser(username) 
    if (!user){
      throw new  UnauthorizedException();

    }
    return user
  }
}
