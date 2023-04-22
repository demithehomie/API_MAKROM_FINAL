import { IsNumberString, MaxLength } from "class-validator";

export class AuthConfirmSMSDto {
    
    @MaxLength(5)
    @IsNumberString()
    SMSVerificationCode: string;
}