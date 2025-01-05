import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  [x: string]: any;
  constructor(
    private usersService: UsersService,
    private configService:ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),   
      ignoreExpiration: false,  
      secretOrKey: configService.get<string>('JWT_SECRET') || 'secretKey',
    });
  }

  async validate(payload: any) {
    console.log('Token Payload:', JSON.stringify(payload, null, 2)); 
  
    if (!payload || !payload.sub || !payload.email) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const user = await this.usersService.findOne(payload.sub);
  
    if (!user) {
      throw new UnauthorizedException('User not found'); 
    }
  
    if (user.email !== payload.email) {
      throw new UnauthorizedException('email does not match'); 
    }
  
    if (user.isBanned) {
      throw new UnauthorizedException('User is banned');  
    }
  
    
    return {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
  }}
  