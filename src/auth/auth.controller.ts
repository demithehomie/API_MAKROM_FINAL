//import { GoogleOAuthGuard } from "./google/google-oauth.guard"
import { Controller, Request, Post, Body, UseGuards, UseInterceptors, NotFoundException, BadRequestException, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, UnauthorizedException } from "@nestjs/common";
import { Get, Param, UploadedFile, UploadedFiles } from "@nestjs/common/decorators";
import { FileInterceptor, FilesInterceptor, FileFieldsInterceptor } from "@nestjs/platform-express";
import { User } from "src/decorators/user.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import {join} from 'path';
import { FileService } from "src/file/file.service";
import { AuthConfirmEmailDTO } from "./dto/auth-confirm-email.dto";
import { AuthConfirmSMSDto } from "./dto/auth-confirm-sms.dto";
import { AuthenticateDTO } from "./dto/authenticate.dto";
import { AuthSendEmailDTO } from "./dto/auth-send-email.dto copy";
import { MailerService } from "@nestjs-modules/mailer";
import { ParamId } from "src/decorators/param-id.decorator";

// 'https://grandfinale.onrender.com'; //


@Controller('auth')
export class AuthController {
    jwtService: any;
    prisma: any;

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly fileService: FileService,
        private readonly mailerService: MailerService
    ){}
    

    //////////////
    @Get('/get-by-email/:email')
    async obterUsuarioPorEmail(@Param('email') email: string) {
      const user = await this.authService.findUserByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;  
    }
    

    @Post('login')
    async login(@Body() {email, password}: AuthLoginDTO) {
        return this.authService.login(email, password);
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {
        return this.authService.register(body);
    }

  
    
    @Post('start-confirm-email')
    async startConfirmByEmail(@Body() id: number) {
        return this.authService.sendEmail(id);
    }
    
    //
    @Post('confirm-email')
    async confirmUserByEmail(@Body() {emailVerificationCode}: AuthConfirmEmailDTO) {
        return this.authService.startEmailConfirmation(emailVerificationCode);
    }

    @Post('start-confirm-sms')
    async startConfirmSMS(@Body() id: number) {
        return this.authService.startSMSConfirmation(id);
    }
     
    @Post('confirm-sms')
    async confirmSMS(@Body() {verificationCode}: AuthConfirmSMSDto) {
        return this.authService.verifySMSCode(verificationCode);
    }
    
    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO) {
        return this.authService.forget(email);
    }
//
    @Post('reset')
    async reset(@Body() {password, forgetVerificationCode}: AuthResetDTO) {
        return this.authService.reset(password, forgetVerificationCode);
    }

    @UseGuards(AuthGuard)  ///////////
    @Post('me')
    async me(@User() user) {
        return {user};
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(
        @User() user,
        @UploadedFile(new ParseFilePipe({
            validators: [
                new FileTypeValidator({fileType:'image/png'}),
                new MaxFileSizeValidator({maxSize: 1024 * 50}),
            ]
        })) photo: Express.Multer.File
    ) {
//
        const path = join(__dirname, '..', '..', 'storage', 'photos', `photo-${user.id}.png`);
        
        try {
         await this.fileService.upload(photo, path);
        } catch (e) {
            throw new BadRequestException(e)
        }

        return {photo};
    }

    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(AuthGuard)
    @Post('files')
    async uploadFiles(@User() user, @UploadedFiles() files: Express.Multer.File[]) {
        return files
    }

    @UseInterceptors(FileFieldsInterceptor([{
        name: 'photo',
        maxCount: 1
    }, {
        name: 'documents',
        maxCount: 10
    }]))
    
    @UseGuards(AuthGuard)
    @Post('files-fields')
    async uploadFilesFields(@User() user, @UploadedFiles() files: {photo: Express.Multer.File, documents: Express.Multer.File[]}) {
        return files;
    }

    // @Get('google')
    // @UseGuards(GoogleOAuthGuard)
    // async googleAuth(@Request() req) {}
  
    // @Get('google-redirect')
    // @UseGuards(GoogleOAuthGuard)
    // googleAuthRedirect(@Request() req) {
    //   return this.authService.googleLogin(req);
    // }

}