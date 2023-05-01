import { Injectable, NotFoundException } from "@nestjs/common";
import { ClienteDTO } from "./client.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ClienteService {

    constructor(private readonly prisma: PrismaService) {}

    async create(id: any, name: any, cpfCnpj: any ) {
        
       
       return this.prisma.cliente.create({
        data: {
         id, // data.id,
         name, //data.name,
         cpfCnpj // data.cpfCnpj

          },
       });

    }

    async list() {
        return this.prisma.cliente.findMany();
    }
    
    async show(cpfCnpj: string) {
        await this.exists(cpfCnpj);
        return this.prisma.cliente.findUnique({
            where: {
                cpfCnpj: cpfCnpj.toString()
            }
        })
        

    }

    
    async exists(cpfCnpj: string) {
     
        console.log(`Buscando cliente com CPF/CNPJ: ${cpfCnpj}`);
            const cliente = await this.prisma.cliente.findUnique({
                where: {
                    cpfCnpj: cpfCnpj.toString()
                },
        });
        console.log(`Resultado da busca: ${JSON.stringify(cliente)}`);
        if (!cliente) {
            throw new NotFoundException(`O cliente ${cpfCnpj} não existe no banco de dados da COOPEERE.`);
        }
        return JSON.stringify(cliente)
      }
      

}  //