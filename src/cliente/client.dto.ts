/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class ClienteDTO {

    @IsString()
    id: string;


}
//