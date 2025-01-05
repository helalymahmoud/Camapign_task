import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  decodeToken(token: string): any {
    try {
      return this.jwtService.verify(token); 
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
}
