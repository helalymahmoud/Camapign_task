import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private   transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'kapewo4906@pixdd.com',     
      port: 587,  
      secure: false,     
      auth: {
        user: 'mahmoud.hisham.7370@gmail.cmom',
        pass: '73707370mahmoud', 
      },
    }); 
  }

  async sendVerificationEmail(to: string, token: string) {
    const verificationUrl = `http://your-frontend-url.com/verify?token=${token}`;

    const mailOptions = {
      from: '"Your App Name" <kapewo4906@pixdd.com>',  
      to: 'me@me.com',
      subject: 'Stockist interest form',
      text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
      html: `<p>Please verify your email by clicking on the following link:</p><a href="${verificationUrl}">Verify Email</a>`,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
