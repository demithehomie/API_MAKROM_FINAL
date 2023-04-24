import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProdistService {

    constructor(private readonly prisma: PrismaService) {}

    async showCliente(NumeroDoCliente: number) {

        await this.exists(NumeroDoCliente);

        return this.prisma.prodist.findUnique({
            where: {
                NumeroDoCliente,
            }
        })

    }//
 
    async exists(NumeroDoCliente: number) {
        if (!(await this.prisma.prodist.count({
            where: {
                NumeroDoCliente,
            }
        }))) {
            throw new NotFoundException(`O Cliente ${NumeroDoCliente} não existe.`);
        }
    }

}