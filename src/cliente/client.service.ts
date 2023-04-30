import { Injectable } from "@nestjs/common";
import { ClienteDTO } from "./client.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ClienteService {

    constructor(private readonly prisma: PrismaService) {}

    async create(id: any) {
       // const { id } = clienteDTO;
       
       return this.prisma.cliente.create({
        data: {
         id
          },
       });

    }

} //