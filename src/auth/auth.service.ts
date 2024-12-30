import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
// import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { MailService } from 'src/mailer/mail.service';
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
    this.sendVerificationEmail(email)
    return this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
  }


  public async login (loginDto:LoginDto){
    const {email,password}=loginDto;

    const user =await this.userRepository.findOne({where:{email}});
    if(!user) throw new BadRequestException('invalid email or paasword');

    const isPasswordMatch =await bcrypt.compare(password,user.password);
    if(!password) throw new BadRequestException('invalid email or paasword');

    return user

  }
  
    

  async sendVerificationEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const verificationToken = uuidv4();
    user.verificationToken = verificationToken;

    await this.userRepository.save(user);

    await this.mailService.sendMail({
      to: user.email,
      subject: 'Verify Your Email',
      html: `<h1>Hello ${user.name}</h1><p>Verify your email using the token: ${verificationToken}</p>`,
    } as any);
    return true;
    
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
    await this.mailService.sendMail({
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

function uuidv4() {
  throw new Error('Function not implemented.');
}
     