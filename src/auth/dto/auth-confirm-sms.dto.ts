import { IsNumberString, IsString, MaxLength } from "class-validator";

export class AuthConfirmSMSDto {
    
    @MaxLength(5)
    @IsNumberString()
    SMSVerificationCode: string;

    @IsString()
    mobilePhone: string;
}