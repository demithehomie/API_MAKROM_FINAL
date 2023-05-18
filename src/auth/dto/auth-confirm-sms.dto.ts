import { IsNumberString, IsString, MaxLength } from "class-validator";

export class AuthConfirmSMSDto {
    
    @MaxLength(5)
    @IsNumberString()
    verificationCode: string;


//     @IsString()
//     mobilePhone: string;
}