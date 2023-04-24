import { Prodist, User } from '@prisma/client';
import * as PDFDocument from 'pdfkit';
import { ProdistService } from 'src/prodist/prodist.service';
import { UserService } from 'src/user/user.service';

export class PDFService {

  constructor( private prodistService: ProdistService, private prodist: Prodist, private userService: UserService){}


  generatePDF(): PDFDocument {

    //const user: User = await this.userService.show(id);

    // Cria um novo documento PDF
    const doc = new PDFDocument();
    
    // Escreve o conteúdo no PDF
   

    doc.font('Helvetica-Bold').fontSize(20).text(`Formulário PRODIST`, 50, 50);
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text('1. Identificação da Unidade Consumidora - UC', 50, 100, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`Código da UC: `, 50, 150, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`Classe: `, 50, 200, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`Rua/AV: `, 50, 250, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`Nº: `, 50, 300, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`CEP: `, 50, 350, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`Bairro: `, 50, 400, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`E-Mail: `, 50, 450, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`Telefone: `, 50, 500, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`Celular: `, 50, 550, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`CPF/CNPJ: `, 50, 550, { width: 500 });
    doc.moveDown();
    // Retorna o documento PDF gerado
    return doc;
  }
} //
