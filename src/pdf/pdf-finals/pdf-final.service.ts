import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TriagemProdist, User } from '@prisma/client'; // Substitua pelo caminho correto para o seu modelo "usuarios"

@Injectable()
export class PdfFinalService {
  constructor(private readonly prisma: PrismaService) {} // Certifique-se de importar o PrismaService corretamente

  async obterUsuarios(): Promise<User[]> {
    return this.prisma.user.findMany(); // Substitua "usuario" pelo nome correto da sua tabela no banco de dados
  }

  async obterUsuario(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async obterNumeroDoUsuarioProdist(NumeroDoCliente: string): Promise<TriagemProdist> {
    return this.prisma.prodist.findUnique({ where: {NumeroDoCliente}})
  }
}
