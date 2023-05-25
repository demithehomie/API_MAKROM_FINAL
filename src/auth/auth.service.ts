  import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common'
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
  import axios from 'axios';

  @Injectable()
  export class AuthService {

      private issuer = 'login';
      private audience = 'users';

      
//
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
            this.configService.get('clientID'),
            this.configService.get('clientSecret'),
            'https://developers.google.com/oauthplayground',
          );
        
          oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN,
          }); //
        
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

      // No seu UserService
  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      return user;
    } catch (error) {
      // Lidar com o erro, como registrar em um arquivo de log ou retornar uma mensagem de erro adequada
      throw new Error('Error finding user by email');
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

          return {
            token: this.createToken(user),
            id: user.id,
            name: user.name,
            email: user.email,
            cpfCnpj: user.cpfCnpj, 
            mobilePhone: user.mobilePhone,
            phone: user.phone,
            company: user.company,
            postalCode: user.postalCode,
            address: user.address,
            state: user.state,
            province: user.province,
            city: user.city,
            addressNumber: user.addressNumber,
            complement: user.complement,
            municipalInscription: user.municipalInscription,
            stateInscription: user.stateInscription,
            additionalEmails: user.additionalEmails,
            observations: user.observations,
            birthAt: user.birthAt,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,

            emailVerificationCode: user.emailVerificationCode,
            SMSVerificarionCode: user.SMSVerificationCode,

            //customer_id: client.customer_id
          } 

      }


      async startSMSConfirmation(id: number) {

        const user = await this.prisma.user.findFirst({
          where: {
            id: id
          },
        });
    
        if (!user) {
          throw new UnauthorizedException('Celular está incorreto.');
        }
    
        const SMSVerificationCode = this.generateRandomNumericCodeforSMS();
    
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            SMSVerificationCode,
          },
        });
    
        await this.sendSMS(user.mobilePhone, SMSVerificationCode); // Envie o SMS
    
        return { SMSVerificationCode, name: user.name, mobilePhone: user.mobilePhone };
      }
    
      private async sendSMS(mobilePhone: string, verificationCode: string) {

        const user = await this.prisma.user.findFirst({
          where: {
            mobilePhone,
          },
        });
  //
        const apiKey =  process.env.WEB_SMS_API_KEY; // Substitua com a sua chave de API do SMSMobile
    
        const smsMessage = `COOPEERE: Seu codigo de verificacao e: ${verificationCode}`;
    
        try {
          const response = await axios.post(
            'https://app.websms.com.br/sms/shortcode/routes/sms.php',
            {
              hash: apiKey,
              acao: "enviar",
              numero: [user.mobilePhone],
              mensagem: smsMessage,
            },
          
          );
    
          // Verifique a resposta da chamada de API e faça o tratamento necessário
          console.log(response.data);
        } catch (error) {
          // Trate qualquer erro de envio de SMS aqui
          console.error(error);
        }
      }
    
    

      async verifySMSCode(verificationCode: string) {
        const user = await this.prisma.user.findFirst({
          where: {
            SMSVerificationCode: verificationCode
          },
        });
    
        if (!user) {
          throw new NotFoundException('Usuário não encontrado.');
        }

      
    
        if (user.SMSVerificationCode === verificationCode) {
          // O código SMS foi confirmado com sucesso
          // Realize as ações necessárias aqui, por exemplo, atualize o status de verificação do usuário
    
          await this.prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              SMSVerificationCode: undefined,
            },
          });
    
          return { verificationCode, name: user.name, email: user.email };
        } else {
          throw new NotFoundException('Código de verificação SMS inválido.');
        }
      }
    
  
    
    // async confirmUserByEmail(code: string) {
    //     const emailVerificationCode = "" //this.generateRandomNumericCode();

    //     const user = await this.prisma.user.findFirst();

    //     if (!user) {
    //         throw new UnauthorizedException('O e-mail está incorreto.');
    //     }

    //     if (!user) {
    //         throw new UnauthorizedException('E-mail e/ou senha incorretos.');
    //     }

    //     const token = this.jwtService.sign(
    //         { code: emailVerificationCode },
    //         { expiresIn: '30 minutes', subject: String(user.id) }
    //       );


    //     await this.setTransport();
    
    //     await this.mailer.sendMail({
    //         subject: 'Confirmação de Senha',
    //         transporterName: 'gmail',
    //         to: user.email, // list of receivers
    //         from: 'demithehomie@gmail.com', // sender address
        
    //         template: 'confirm',
    //         context: {
    //             user: user.name,
    //             code: emailVerificationCode,
    //             link: "http://localhost:8100/successpage"
    //         }
    //       })
          
    //       .then((success) => {
    //         console.log(success);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });

    //     return true;

    // }   

      
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
      }); //

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

      async sendEmail(id: number) {
        
        const user = await this.prisma.user.findFirst({
          where: {
            id: id
          },
        });

        if (!user) {
          throw new UnauthorizedException('Celular está incorreto.');
        }
    
      
          const emailVerificationCode =  this.generateRandomNumericCodeResend() //this.createToken(user);

          await this.prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              emailVerificationCode,
            },
          });
      
          await this.sendSingleEmail(user.email, emailVerificationCode); // Envie o SMS
    
          return { emailVerificationCode, name: user.name, email: user.email };
        
      }

  private async sendSingleEmail(email: string, emailVerificationCode: string){

        const user = await this.prisma.user.findFirst({
          where: {
            email,
          },
        });
        
        try {
          await this.setTransport();
        
          await this.mailerService.sendMail({
            transporterName: 'gmail',
            to: user.email,
            from: 'demithehomie@gmail.com',
            subject: 'Bem-Vindo a Coopeere',
            template: 'confirm',
            context: {
              code: user.emailVerificationCode,
            },
          });
          console.log('Email sent successfully');
        } catch (error) {
          console.log('Error sending email:', error);
        }
        
      }
      

      // googleLogin(req) {
      //   if (!req.user) {
      //     return 'No user from google';
      //   }
    
      //   return {
      //     message: 'User information from google',
      //     user: req.user,
      //   };
      // }

      generateRandomNumericCodeSignUp(): string {
        const randomNum = Math.floor(Math.random() * 100000);
        const code = randomNum.toString();
        return code.padStart(5  , '0');
      }

      generateRandomNumericCodeforSMS(): string {
        const randomNum = Math.floor(Math.random() * 100000);
        const code = randomNum.toString();
        return code.padStart(5  , '0');
      }

      generateRandomNumericCodeResend(): string {
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