import pdfParse from 'pdf-parse';

export class PdfService {
  async extractText(buffer: Buffer): Promise<string> {
    const result = await pdfParse(buffer);

    return result.text;
  }
}

export const pdfService = new PdfService();