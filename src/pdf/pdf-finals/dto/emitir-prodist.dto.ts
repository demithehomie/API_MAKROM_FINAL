import { IsNumber, IsString } from "class-validator";

export class EmitirProdistDto {

    @IsNumber()
    id: number
    
    @IsString()
    NumeroDoCliente: string
}