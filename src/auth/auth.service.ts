import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
@Injectable()
export class AuthService {
  userService: any;
  mailerService: any;
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,) 
    {}


    async signUp(user: User) {
      const token = Math.floor(1000 + Math.random() * 9000).toString();
      await this.mailerService.sendUserConfirmation(user, token);
    }




  async register(registerDto: RegisterDto): Promise<string> {
    const { name, email, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ 
      name,
      email,
      password: hashedPassword,
      role: 'User', 
    });
    await this.userRepository.save(user);
    return this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
  }

  async login(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
  }

  async HandleForgetPassword (email: string): Promise<string> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const token = this.jwtService.sign(
      { id: user.id },
      { expiresIn: '1h' } 
    );
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Password',
      text: `Click this link to reset your password: ${resetLink}`,
    });
    return 'Password reset link has been sent to your email';
  }


  async HandleResetPassword(token: string, newPassword: string): Promise<string> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userService.findById(payload.id);
      if (!user) {
        throw new Error('Invalid token');
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userService.updatePassword(user.id, hashedPassword);
      return 'Password has been reset successfully';
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
  



}
     