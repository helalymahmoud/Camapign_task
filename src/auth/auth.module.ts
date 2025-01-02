import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { User } from 'src/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { MailService } from 'src/mailer/mail.service';
import { GqlAuthGuard,  } from './guards/jwt-auth.guard';

@Module({
  imports: [
    MailerModule,
    UsersModule,
    PassportModule,
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret:  process.env.JWT_SECRET|| 'secretKey',
      signOptions: { expiresIn: '1d' }, 
    }),
  ],
  providers: [
    AuthService,
     AuthResolver, 
     JwtStrategy,
      RolesGuard,
      GqlAuthGuard  ,
      MailService],
  exports: [AuthService],
})
export class AuthModule {}




