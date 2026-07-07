import { getCollection } from './chroma.service';

export class VectorService {
  async store(
    documentId: string,
    documentName: string,
    organizationId: string,
    chunks: string[],
    embeddings: number[][],
  ) {
    const collection =
      await getCollection();

    await collection.add({
      ids: chunks.map(
        (_, index) =>
          `${documentId}-${index}`,
      ),

      documents: chunks,

      embeddings,

      metadatas: chunks.map(
        (_, index) => ({
          documentId,
          documentName,
          organizationId,
          chunkIndex: index,
        }),
      ),
    });
  }
}

export const vectorService =
  new VectorService();