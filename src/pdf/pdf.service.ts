import * as PDFDocument from 'pdfkit';

export class PDFService {
  generatePDF(): PDFDocument {
    // Cria um novo documento PDF
    const doc = new PDFDocument();
    
    // Escreve o conteúdo no PDF
    doc.fontSize(14).text('Olá, Mundo!');

    doc.font('Helvetica-Bold').fontSize(20).text('Header', 50, 50);
doc.moveDown();
doc.font('Times-Roman').fontSize(12).text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ligula velit. Integer rutrum mauris in mi varius, at pharetra nulla condimentum. In imperdiet magna quis ex vulputate, vel commodo eros ultricies. Nulla facilisi. Vivamus vitae dapibus augue. Nullam luctus nibh sed consectetur pharetra. In hac habitasse platea dictumst. Donec ullamcorper velit ut luctus faucibus.', 50, 100, { width: 500 });

    
    // Retorna o documento PDF gerado
    return doc;
  }
} //
