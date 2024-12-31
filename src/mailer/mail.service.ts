import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Context } from '@nestjs/graphql';
import { from } from 'form-data';
import { template } from 'handlebars';
import * as nodemailer from 'nodemailer';
import { Subject } from 'rxjs';

@Injectable()
export class MailService {
  [x: string]: any;
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host:process.env.MAIL_HOST,   
      port:parseInt(process.env.MAIL_PORT, 10),
      secure: process.env.MAIL_PORT === '465',
      auth: {
        user:process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD 
      },
    }); 
  }
  async sendRestPasswordTemplate(email:string,resetPasswordLink:string){
    try {
      await this.mailerservice.sendMail({
        to:email,
        from: `frd`,
        Subject: 'Rest Password',
        template: 'Rest Password',
        Context:{resetPasswordLink}
        
      })
    } catch(error){
      console.log(error)
      throw new RequestTimeoutException();
    }
  }



  async sendMail(to: string, subject: string, text: string, html: string): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: `"Your App Name" <${process.env.MAIL_USER}>`, 
        to,
        subject,
        text,
        html,
        
      });
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}

  

