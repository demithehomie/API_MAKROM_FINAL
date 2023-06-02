import { IsBoolean, IsString } from "class-validator";


export class TriagemDTO {

    @IsString()
    operadora: string

    @IsBoolean()
    ehTitular: boolean
}