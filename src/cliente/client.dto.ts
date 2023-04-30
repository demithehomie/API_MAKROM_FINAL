/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class ClienteDTO {

    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    cpfCnpj: string;
}
//