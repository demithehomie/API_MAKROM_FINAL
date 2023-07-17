import { Body, Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PdfFinalService } from './pdf-final.service';
import * as PDFKit from 'pdfkit';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UsuarioDto } from './dto/usuario.dto';
import { ParamId } from 'src/decorators/param-id.decorator';
import { NumeroDoProdistDto } from './dto/prodist.dto';
import { EmitirProdistDto } from './dto/emitir-prodist.dto';

@Controller('usuarios')
export class PdfFinalController {
  constructor(private readonly usersService: PdfFinalService) {}

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

    /////////// opa opa 

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
    @ParamId('id') id: number, //
    @Param('NumeroDoCliente') NumeroDoCliente: string
    
    ) {
 
    const usuarioLogadoId = id; // Supondo que você tenha a informação do usuário logado no objeto request
    const usuario = await this.usersService.obterUsuario(usuarioLogadoId);

    const numeroProdistDoUsuarioLogado = NumeroDoCliente;
    const prodistN = await this.usersService.obterNumeroDoUsuarioProdist(numeroProdistDoUsuarioLogado)

    const doc = new PDFKit();

      
    doc.font('Helvetica-Bold').fontSize(20).text(`Formulário PRODIST`, 25, 25);
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(20).text(`                                                                                      `, 25, 50);
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(15).text('1. Identificação da Unidade Consumidora - UC', 25, 75, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(`Código da UC: ${prodistN.NumeroDoCliente} - Classe: ${prodistN.ClasseUC}`, 29, 100, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(` Rua/AV:  ${usuario.address}, Nº: ${usuario.addressNumber}, CEP: ${usuario.postalCode} `, 27, 125, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(` Bairro: ${usuario.province}, Cidade: ${usuario.city},  `, 27, 150, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(` E-Mail: ${usuario.email}  `, 27, 175, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(` Telefone: ${usuario.phone} , Celular: ${usuario.mobilePhone}  `, 25, 200, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(` CPF: ${usuario.cpfCnpj} `, 25, 225, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(15).text(` 2 - Dados da Unidade Consumidora  `, 25, 250, { width: 500 });
    doc.moveDown();
    // doc.font('Helvetica').fontSize(16).text(` Localização em coordenadas  -        Latitude:      - Longitude:      `, 25, 275, { width: 500 });
    // doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(` Carga Instalada: ${prodistN.PotenciaInstalada} kW  -  Tensão de Atendimento: ${prodistN.TensaoDeAtendimento} V `, 25, 300, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(` Tipo de Conexão: ${prodistN.TipoDeConexao}`, 25, 325, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(15).text(` 3 - Dados da Geração `, 25, 350, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(` Potência Instalada de geração: ${prodistN.PotenciaInstaladaGeral} KW `, 25, 375, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(16).text(` Tipo de Fonte de Geração: ${prodistN.TipoDaFonteDeGeracao} `, 25, 400, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(15).text(` 4 - Documentação a ser anexada `, 25, 425, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(12).text(` 1. Número de registro válido no conselho profissional competente do responsável técnico `, 25, 450, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(12).text(` 2 - Diagrama unifilar contemplando Geração/Proteção (inversor, se for o caso)/Medição e memorial descritvo da instalação`, 25, 470, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(12).text(` 3 - Certificado de conformidade do(s) inversor(es) ou número de registro da concessão do Inmetro do(s) inversor(es) para a tensão nominal de conexão coma rede.  `, 25, 500, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(12).text(` 4 - Dados necessários ára registro da centrl geradora conforme disponível no site da ANEEL  `, 25, 530, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(12).text(` 5 - Lista de unidades consumidoras participantes do sistema de compensação (se houver) indicando a porcentagem de rateio dos créditos e o enquadramento, conforme Resolução Normativa Nº 482/2012  `, 25, 555, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(12).text(` 6 - Cópia de instrumento jurídico que comprove o compromisso de solidariedade entre os integrantes, se houver.  `, 25, 600, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(12).text(` 7 - Documento que ccomprove o reconhecimento pela ANEEL da cogeração qualificada, se houver .  `, 25, 630, { width: 500 });
    doc.moveDown();
    doc.font('Helvetica').fontSize(12).text(` 8 - NO caso de ligação de nova unidade consumidora ou aumento de carga de unidade existente, devem ser apresentadas as informações descritas nas regras de Prestação de Serviço Público de Distribuição de Energia Elétrica para os respectivos casos.  `, 25, 655, { width: 500 });
    doc.moveDown();
    // doc.font('Helvetica-Bold').fontSize(15).text(` 5 - Contrato na Distribuidora (preenchido pela Dstribuidora).  `, 25, 790, { width: 500 });
    // doc.moveDown();
    // doc.font('Helvetica').fontSize(16).text(` Responsável / Área: ${usuario.name}  `, 25, 815, { width: 500 });
    // doc.moveDown();
    // doc.font('Helvetica').fontSize(16).text(` Endereço: ${usuario.address}, Nº: ${usuario.addressNumber}, CEP: ${usuario.postalCode} `, 25, 840, { width: 500 });
    // doc.moveDown();
    // doc.font('Helvetica').fontSize(16).text(` Telefone: ${usuario.mobilePhone}  `, 25, 865, { width: 500 });
    // doc.moveDown();
    // doc.font('Helvetica').fontSize(16).text(` Email: ${usuario.email}  `, 25, 885, { width: 500 });
    // doc.moveDown();

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', 'attachment; filename=usuario.pdf');

    doc.pipe(response);
    doc.end();

    return doc
  }
}
