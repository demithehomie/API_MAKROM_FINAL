import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MailingService {

  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      this.configService.get('clientID'),
      this.configService.get('clientSecret'),
      'https://developers.google.com/oauthplayground',
    );
   
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });
  
    try {
      const accessToken: string = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            reject(new Error(`Failed to create access token: ${err.message}`));
          }
          resolve(token);
        });
      });
  
       const config: Options = {
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: this.configService.get('EMAIL'),
          clientId: this.configService.get('clientID'),
          clientSecret: this.configService.get('clientSecret'),
          accessToken,
        },
        tls: {
          rejectUnauthorized: false,
        },
      };
      this.mailerService.addTransporter('gmail', config);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  
  generateRandomNumericCode(): string {
    const randomNum = Math.floor(Math.random() * 100000);
    const code = randomNum.toString();
    return code.padStart(5  , '0');
  }

    public async sendMail() {
      await this.setTransport();
      const verificationCode = this.generateRandomNumericCode();
      this.mailerService
        .sendMail({
          transporterName: 'gmail',
          to: 'engdemeferreira@gmail.com', // list of receivers
          from: 'demithehomie@gmail.com', // sender address
          subject: 'Verficiaction Code', // Subject line
          template: 'action',
          context: {
            // Data to be sent to template engine..
            code: verificationCode,
          },
        }) //
        .then((success) => {
          console.log(success);
        })
        .catch((err) => {
          console.log(err);
        });
    }
}
