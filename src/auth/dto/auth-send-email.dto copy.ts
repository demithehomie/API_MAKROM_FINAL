import { IsEmail, IsJWT, IsNumberString, MaxLength } from "class-validator";

export class AuthSendEmailDTO {

    @MaxLength(5)
    @IsNumberString()
    verificationCode: string;

    @IsEmail()
    email: string;

}