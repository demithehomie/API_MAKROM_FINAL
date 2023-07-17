import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PdfFinalController } from './pdf-final.controller';
import { PdfFinalService } from './pdf-final.service';

@Module({
  controllers: [PdfFinalController],
  providers: [PdfFinalService, PrismaService], // Certifique-se de importar o PrismaService corretamente
})
export class PdfFinalModule {}
