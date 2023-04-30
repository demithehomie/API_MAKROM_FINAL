import { Injectable } from "@nestjs/common";
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

} //