import { IsNumber } from "class-validator";

export class UsuarioDto {

    @IsNumber()
    id: number
}