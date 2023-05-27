import { Body, Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UsuariosService } from './pdf-teste.service';
import * as PDFKit from 'pdfkit';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UsuarioDto } from './dto/usuario.dto';
import { ParamId } from 'src/decorators/param-id.decorator';
import { NumeroDoProdistDto } from './dto/prodist.dto';
import { EmitirProdistDto } from './dto/emitir-prodist.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usersService: UsuariosService) {}

  @Get('pdf-all')
  async gerarPDFAll(@Res() response: Response) {
    const usuarios = await this.usersService.obterUsuarios(); // Substitua pela lógica adequada para obter os usuários do banco de dados

    const doc = new PDFKit(); // Cria uma nova instância do PDFKit

    doc.text('Lista de Usuários'); // Adiciona um título ou cabeçalho

    // Itera sobre os usuários e adiciona as informações ao PDF
    usuarios.forEach((usuario) => {
      doc.text(`Nome: ${usuario.name}`);
      doc.text(`Email: ${usuario.email}`);
      doc.text('-------------------');
    });

    // Define o tipo de conteúdo do cabeçalho de resposta como PDF
    response.setHeader('Content-Type', 'application/pdf');

    // Define o cabeçalho de resposta para fazer o download do PDF
    response.setHeader('Content-Disposition', 'attachment; filename=usuarios.pdf');

    // Envie o PDF como resposta
    doc.pipe(response);
    doc.end();
  }

  @Get('pdf-single/:id/:NumeroDoCliente')
  //@UseGuards(AuthGuard)
  async gerarPDFSingle(
    @Res() response: Response, 
    @ParamId('id') id: number,
    @Param('NumeroDoCliente') NumeroDoCliente: string
    
    ) {
 
    const usuarioLogadoId = id; // Supondo que você tenha a informação do usuário logado no objeto request
    const usuario = await this.usersService.obterUsuario(usuarioLogadoId);

    const numeroProdistDoUsuarioLogado = NumeroDoCliente;
    const prodistN = await this.usersService.obterNumeroDoUsuarioProdist(numeroProdistDoUsuarioLogado)

    const doc = new PDFKit();

      
    doc.font('Helvetica-Bold').fontSize(20).text(`Formulário PRODIST`, 50, 50);
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text('1. Identificação da Unidade Consumidora - UC', 50, 100, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`Código da UC: ${prodistN.NumeroDoCliente}`, 50, 150, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`Classe: ${prodistN.ClasseUC}`, 50, 200, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`Rua/AV:  ${usuario.address}`, 50, 250, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`Nº: ${usuario.addressNumber} `, 50, 300, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`CEP: ${usuario.postalCode} `, 50, 350, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`Bairro: ${usuario.province} `, 50, 400, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`E-Mail: ${usuario.email}`, 50, 500, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`Telefone: ${usuario.phone}`, 50, 550, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`Celular: ${usuario.mobilePhone} `, 50, 600, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`CPF/CNPJ: ${usuario.cpfCnpj}`, 50, 650, { width: 500 });
    doc.moveDown();

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', 'attachment; filename=usuario.pdf');

    doc.pipe(response);
    doc.end();

    return doc
  }
}
