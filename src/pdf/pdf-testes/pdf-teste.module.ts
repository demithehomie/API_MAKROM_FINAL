import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuariosController } from './pdf-teste.controller';
import { UsuariosService } from './pdf-teste.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService], // Certifique-se de importar o PrismaService corretamente
})
export class UsuariosModule {}
