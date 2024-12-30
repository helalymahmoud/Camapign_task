import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private   transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host:process.env.MAIL_HOST,   
      port:process.env.MAIL_PORT,
      auth: {
        user:process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD 
      },
    }); 
  }

  async sendVerificationEmail(mailOptions) {
    return await this.transporter.sendMail(mailOptions);
  }


  
}
