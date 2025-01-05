import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../guards/jwt-decodeToken'; 
import { JwtService } from '@nestjs/jwt';

export const CurrentUser = createParamDecorator(
  async (data: any, context: ExecutionContext) => {
    const gqlContext = context.getArgByIndex(2);  
    const authHeader = gqlContext.req.headers['authorization'];

    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header is missing or invalid');
    }

    const token = authHeader.split(' ')[1]; 
    const jwtService = new JwtService({ secret: 'secretKey' }); 
    const tokenService = new TokenService(jwtService);
    let userData;

    try {
      userData = tokenService.decodeToken(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    console.log("Decoded User Data:", userData);
    return userData;
  },
);
