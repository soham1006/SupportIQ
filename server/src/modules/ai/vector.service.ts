import { getCollection } from './chroma.service';

export class VectorService {
  async store(
    documentId: string,
    chunks: string[],
    embeddings: number[][],
  ) {
    const collection = await getCollection();

    await collection.add({
      ids: chunks.map((_, i) => `${documentId}-${i}`),

      documents: chunks,

      embeddings,

      metadatas: chunks.map((_, i) => ({
        documentId,
        chunkIndex: i,
      })),
    });
  }
}

export const vectorService = new VectorService();