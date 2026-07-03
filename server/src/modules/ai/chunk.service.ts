import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

export class ChunkService {
  private splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

 async split(text: string): Promise<string[]> {
  const docs =
    await this.splitter.createDocuments([text]);

  return docs.map(doc => doc.pageContent);
}
}

export const chunkService = new ChunkService();