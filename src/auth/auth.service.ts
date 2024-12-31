import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { MailService } from 'src/mailer/mail.service';
import { randomBytes } from 'crypto';
@Injectable()
export class AuthService {
  mailService: any;
  userService: any;
 users: any;
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
     private readonly userRepository: Repository<User>,       
     private readonly mailerService: MailService,
  ){}

async register(registerDto: RegisterDto): Promise<{ message: string }> {
  const { name, email, password } = registerDto;

  const existingUser = await this.userRepository.findOne({ where: { email } });
  if (existingUser) {
    throw new ConflictException('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiresAt = new Date();
  otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 10); 
  const user = this.userRepository.create({
    name,
    email,
    password: hashedPassword,
    role: 'User',
    otp,
    otpExpiresAt,
  });
  await this.userRepository.save(user);

  const subject = 'Verify Your Email';
  const text = `Your verification OTP is: ${otp}`;
  const html = `<p>Your verification OTP is:</p><h3>${otp}</h3><p>This OTP is valid for 10 minutes.</p>`;
  await this.mailerService.sendMail(email, subject, text, html);

  return {
    message: 'Registration successful. Please verify your email using the OTP sent to your email address.',
  }}



async verifyOtp(email: string, otp: string): Promise<boolean> {
  const user = await this.userRepository.findOne({ where: { email } });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  if (!user.otp || user.otp !== otp) {
    throw new BadRequestException('Invalid or expired OTP');
  }

  if (user.otpExpiresAt < new Date()) {
    throw new BadRequestException('OTP has expired');
  }

  user.otp = null;
  user.otpExpiresAt = null;
  await this.userRepository.save(user);

  return true;
}



public async login(loginDto: LoginDto): Promise<{ token: string }> {
  const { email, password } = loginDto;

  const user = await this.userRepository.findOne({ where: { email } });
  if (!user) {
    throw new BadRequestException('Invalid email or password');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new BadRequestException('Invalid email or password');
  }

  const payload = { sub: user.id, email: user.email, role: user.role }; // Customize the payload as needed
  const token = this.jwtService.sign(payload);

  return { token };
}



  public async sendResetPasswordLink(email: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new BadRequestException('User with given email does not exist');

    user.resetPasswordToken = randomBytes(32).toString('hex');
    user.resetPasswordExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiration

    await this.userRepository.save(user);

    const resetPasswordLink = `http://localhost:3001/reset-password/${user.resetPasswordToken}`;
    await this.mailerService.sendMail(
      email,
      'Reset Your Password',
      `Reset your password using this link: ${resetPasswordLink}`,
      `<p>Reset your password using this link:</p><a href="${resetPasswordLink}">Reset Password</a>`,
    );

    return { message: 'Password reset link sent to your email, please check your inbox' };
  }



  public async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { resetPasswordToken: token } });
    if (!user || user.resetPasswordExpiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null; // Clear the reset token
    user.resetPasswordExpiresAt = null;

    await this.userRepository.save(user);

    return { message: 'Password successfully reset' };
  }
}

     