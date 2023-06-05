import { Injectable } from "@nestjs/common";
import { TriagemDTO } from "./dto/triagem.dto";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class TriagemService {

    constructor(
        private readonly prisma: PrismaService
    ){}

    validarTriagem(data: TriagemDTO){

        let ehTitular = false
        let ehCooperadoApoiador = false

        if (ehTitular = true) {
            ehCooperadoApoiador = true
        } else {
            ehCooperadoApoiador = false
        }

        return this.prisma.triagemprodist.create({data,});

   
    }

}