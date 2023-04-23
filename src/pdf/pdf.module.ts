import { Module } from '@nestjs/common';
import { PDFService } from './pdf.service';
import { PdfController } from './pdf.controller';

@Module({
  controllers: [PdfController],
  providers: [PDFService],
  exports: [PDFService],
})
export class PDFModule {}
