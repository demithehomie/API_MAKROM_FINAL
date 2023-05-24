import { IsNumber, IsString } from "class-validator";

export class NumeroDoProdistDto {

    @IsString()
    NumeroDoCliente: string
}