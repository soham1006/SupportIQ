import { embeddingService } from './embedding.service';
import { getCollection } from './chroma.service';

export class RetrievalService {
  async search(query: string, topK = 3) {
    const embedding = await embeddingService.embed(query);

    const collection = await getCollection();

    const result = await collection.query({
      queryEmbeddings: [embedding],
      nResults: topK,
    });

   const documents = (result.documents?.[0] ?? []).filter(
  (doc): doc is string => doc !== null,
);

const distances = (result.distances?.[0] ?? []).filter(
  (distance): distance is number => distance !== null,
);

return {
  documents,
  metadatas: result.metadatas?.[0] ?? [],
  distances,
};
  }
}

export const retrievalService = new RetrievalService();