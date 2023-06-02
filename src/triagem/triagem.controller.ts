import { Body, Controller, Get, Post } from "@nestjs/common";
import { TriagemService } from "./triagem.service";
import { TriagemDTO } from "./dto/triagem.dto";

@Controller('triagem')
export class TriagemController {

    constructor(
        private readonly triagemService: TriagemService
    ){}

        @Get()
        mostrarDadosTriagem(){

        }

        @Post('enviar')
        enviarDadosTriagem(@Body() data: TriagemDTO ){
            return this.triagemService.validarTriagem(data)
        }

}