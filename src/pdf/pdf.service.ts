  import { TriagemProdist, User } from '@prisma/client';
  import * as PDFDocument from 'pdfkit';
  import { AuthService } from 'src/auth/auth.service';
  import { PrismaService } from 'src/prisma/prisma.service';
  import { ProdistService } from 'src/prodist/prodist.service';
  import { UserService } from 'src/user/user.service';

  export class PDFService {


    
    constructor( 
      private prodistService: ProdistService, 
      private prodist: TriagemProdist,  
      private prismaService: PrismaService,
      private userService: UserService,
      private authService: AuthService,
      private user: User
      ){
    
      }

  
      
      email!: any
    async generatePDF(): PDFDocument {
      const doc = new PDFDocument();
  
      // this.genProdist(NumeroDoCliente)
      
      const users =  await this.authService.findUserByEmail(this.email); // Método fictício para buscar os usuários do banco de dados

    
      
    
    // this.user =  this.prismaService.user.findUnique({ where: { email } });


      // Cria um novo documento PDF
     
      
      // Escreve o conteúdo no PDF
    
      // for (const usuario of usuarios)  {
      //   doc.text(`Nome: ${usuario.nome}`);
      //   doc.text(`Email: ${usuario.email}`);
      //   doc.text(`-----------------------`);
      // }


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
      doc.font('Helvetica').fontSize(16).text(`Nº: ${users.addressNumber} `, 50, 300, { width: 500 });
      doc.moveDown();
      doc.font('Helvetica').fontSize(16).text(`CEP: ${users.postalCode} `, 50, 350, { width: 500 });
      doc.moveDown();
      doc.font('Helvetica').fontSize(16).text(`CEP: ${users.postalCode} `, 50, 400, { width: 500 });
      doc.moveDown();
      doc.font('Helvetica').fontSize(16).text(`Bairro: ${users.province} `, 50, 450, { width: 500 });
      doc.moveDown();
      doc.font('Helvetica').fontSize(16).text(`E-Mail: ${users.email}`, 50, 500, { width: 500 });
      doc.moveDown();
      doc.font('Helvetica').fontSize(16).text(`Telefone: ${users.phone}`, 50, 550, { width: 500 });
      doc.moveDown();
      doc.font('Helvetica').fontSize(16).text(`Celular: ${users.mobilePhone} `, 50, 600, { width: 500 });
      doc.moveDown();
      doc.font('Helvetica').fontSize(16).text(`CPF/CNPJ: ${users.cpfCnpj}`, 50, 650, { width: 500 });
      doc.moveDown();
      // Retorna o documento PDF gerado
      return doc;
    }
  } //
