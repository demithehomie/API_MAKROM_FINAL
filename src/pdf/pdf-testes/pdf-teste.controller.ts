import { Body, Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UsuariosService } from './pdf-teste.service';
import * as PDFKit from 'pdfkit';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UsuarioDto } from './dto/usuario.dto';

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

  @Get('pdf-single')
  //@UseGuards(AuthGuard)
  async gerarPDFSingle(@Res() response: Response, @Req() request: Request, @Body() user: UsuarioDto) {
   // const user: UsuarioDto
    const usuarioLogadoId = user.id; // Supondo que você tenha a informação do usuário logado no objeto request
    const usuario = await this.usersService.obterUsuario(usuarioLogadoId);

    const doc = new PDFKit();

    doc.text('Dados do Usuário');
    doc.text(`Nome: ${usuario.name}`);
    doc.text(`Email: ${usuario.email}`);
    doc.text('-------------------');

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', 'attachment; filename=usuario.pdf');

    doc.pipe(response);
    doc.end();
  }
}
