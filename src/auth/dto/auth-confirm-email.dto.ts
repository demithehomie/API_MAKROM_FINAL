import { IsEmail, IsJWT, IsNumberString, MaxLength } from "class-validator";

export class AuthConfirmEmailDTO {

    @MaxLength(5)
    @IsNumberString()
    emailVerificationCode: string;

    // @IsEmail()
    // email: string;

}