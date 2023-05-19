import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ProdistDTO } from "./dto/create-prodist.dto";

@Injectable()
export class ProdistService {

   // constructor(private readonly prisma: PrismaService) {}

    constructor(private readonly prisma: PrismaService) {}

    async create(data: ProdistDTO) {

        
        return this.prisma.prodist.create({
            data,
        });

    }
    

    async showCliente(NumeroDoCliente: string) {

        await this.exists(NumeroDoCliente);

        return this.prisma.prodist.findUnique({
            where: {
                NumeroDoCliente,
            }
        })

    }//
 
    async exists(NumeroDoCliente: string) {
        if (!(await this.prisma.prodist.count({
            where: {
                NumeroDoCliente,
            }
        }))) {
            throw new NotFoundException(`O Cliente ${NumeroDoCliente} não existe.`);
        }
    }

}