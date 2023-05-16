import {BadRequestException, Injectable} from '@nestjs/common'
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import {JwtService} from '@nestjs/jwt'
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service'
import { UserService } from 'src/user/user.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { ConfigService } from '@nestjs/config';
import { Options } from 'nodemailer/lib/smtp-transport';
import { google } from 'googleapis';

@Injectable()
export class AuthService {

    private issuer = 'login';
    private audience = 'users';

    

    constructor(
        private readonly configService: ConfigService,
        private readonly mailerService: MailerService,
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
        private readonly mailer: MailerService
    ) {}

 
    private async setTransport() {
        const OAuth2 = google.auth.OAuth2;
        const oauth2Client = new OAuth2(
          this.configService.get('CLIENT_ID'),
          this.configService.get('CLIENT_SECRET'),
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
              clientId: this.configService.get('CLIENT_ID'),
              clientSecret: this.configService.get('CLIENT_SECRET'),
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

    createToken(user:User) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, {
                expiresIn: "10 minutes",
                subject: String(user.id),
                issuer: this.issuer,
                audience: this.audience,

                // remember notBefore - para iniciar tokens em uma hora específica
            })
        }
    }

    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                issuer: this.issuer,
                audience: this.audience,
            });

            return data;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    isValidToken(token: string) {
        try {
            this.checkToken(token);
            return true;
        } catch (e) {
            return false;
        }
    }

    async login(email:string, password:string) {

        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            throw new UnauthorizedException('E-mail e/ou senha incorretos.');
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException('E-mail e/ou senha incorretos.');
        }

        return this.createToken(user);

    }

    async confirmSMS(SMS: string){

      // const SMSVerificationCode = this.generateRandomNumericCode();

      // const verificationData = {
      //     code: SMSVerificationCode,
      //     timestamp: new Date().getTime(),
      // };


  }

 
  
  async confirmUserByEmail(code: string) {
      const emailVerificationCode = "" //this.generateRandomNumericCode();

      const user = await this.prisma.user.findFirst();

      if (!user) {
          throw new UnauthorizedException('O e-mail está incorreto.');
      }

      if (!user) {
          throw new UnauthorizedException('E-mail e/ou senha incorretos.');
      }

      const token = this.jwtService.sign(
          { code: emailVerificationCode },
          { expiresIn: '30 minutes', subject: String(user.id) }
        );


      await this.setTransport();
  
      await this.mailer.sendMail({
          subject: 'Confirmação de Senha',
          transporterName: 'gmail',
          to: user.email, // list of receivers
          from: 'demithehomie@gmail.com', // sender address
      
          template: 'confirm',
          context: {
              user: user.name,
              code: emailVerificationCode,
              link: "http://localhost:8100/successpage"
          }
        })
        
        .then((success) => {
          console.log(success);
        })
        .catch((err) => {
          console.log(err);
        });

      return true;

  }   

    
    async forget(email: string) {

        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            throw new UnauthorizedException('E-mail está incorreto.');
        }


          // Gerar um código numérico aleatório de seis dígitos
    const forgetVerificationCode = this.generateRandomNumericCodeReset();

    // Armazenar o código no banco de dados para o usuário correspondente
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        forgetVerificationCode,
      },
    });

        await this.setTransport();
    
        await this.mailer.sendMail({
            subject: 'Recuperação de Senha',
            transporterName: 'gmail',
            to: user.email, // list of receivers
            from: 'demithehomie@gmail.com', // sender address
        
            template: 'forget',
            context: {
               code: forgetVerificationCode //
            }
          })
          .then((success) => {
            console.log(success);
          })
          .catch((err) => {
            console.log(err);
          });


        return { forgetVerificationCode, name: user.name };

    }

    async reset(password: string, forgetVerificationCode: string) {

      const user = await this.prisma.user.findFirst({
        where: {
          forgetVerificationCode,
        },
      });

      if (!user) {
        throw new BadRequestException('Código de verificação inválido.');
      }

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
     

        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            password: hashedPassword,
            forgetVerificationCode:  undefined, // Limpar o código de verificação após a redefinição da senha
          },
        });
    
        return this.createToken(user);
    }


    async startEmailConfirmation (emailVerificationCode: string){

    
      const user = await this.prisma.user.findFirst({
        where: {
          emailVerificationCode,
        },
      });
  
      if (!user) {
        throw new BadRequestException('Código de verificação inválido.');
      }
  
        
  
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            
            emailVerificationCode: undefined   // Limpar o código de verificação após a redefinição da senha
          },
        });
    
        return this.createToken(user), { emailVerificationCode } ;
  
      
    }

    async register(data: AuthRegisterDTO) {

        const user = await this.userService.create(data);

        const emailVerificationCode =  this.generateRandomNumericCodeSignUp() //this.createToken(user);

        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            emailVerificationCode,
          },
        });
       
        await this.setTransport();
    
        
    
        this.mailerService.sendMail({
            transporterName: 'gmail',
            to: user.email, // list of receivers
            from: 'demithehomie@gmail.com', // sender address
            subject: 'Bem-Vindo a Coopeere', // Subject line
            template: 'confirm',
            context: {
                code:  user.emailVerificationCode,
            }
          })
          .then((success) => {
            console.log(success);
          })
          .catch((err) => {
            console.log(err);
          });


        return {
          token: this.createToken(user),
          emailVerificationCode: emailVerificationCode,
        };
    }

    googleLogin(req) {
      if (!req.user) {
        return 'No user from google';
      }
  
      return {
        message: 'User information from google',
        user: req.user,
      };
    }

    generateRandomNumericCodeSignUp(): string {
      const randomNum = Math.floor(Math.random() * 100000);
      const code = randomNum.toString();
      return code.padStart(5  , '0');
    }

    generateRandomNumericCodeReset(): string {
      const randomNum = Math.floor(Math.random() * 100000);
      const code = randomNum.toString();
      return code.padStart(5  , '0');
    }

    }