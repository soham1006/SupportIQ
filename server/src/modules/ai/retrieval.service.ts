import { embeddingService } from './embedding.service';
import { getCollection } from './chroma.service';

const DISTANCE_THRESHOLD = 0.6;

export class RetrievalService {
  async search(
    query: string,
    topK = 8,
  ) {
    const embedding =
      await embeddingService.embed(
        query,
      );

    const collection =
      await getCollection();

    const result =
      await collection.query({
        queryEmbeddings: [
          embedding,
        ],
        nResults: topK,
      });

    const documents =
      (
        result.documents?.[0] ??
        []
      ).filter(
        (
          doc,
        ): doc is string =>
          doc !== null,
      );

    const distances =
      (
        result.distances?.[0] ??
        []
      ).filter(
        (
          distance,
        ): distance is number =>
          distance !== null,
      );

    const metadatas =
      result.metadatas?.[0] ??
      [];

    const filtered =
      documents
        .map(
          (
            document,
            index,
          ) => ({
            document,

            metadata:
              metadatas[
                index
              ] ?? null,

            distance:
              distances[
                index
              ] ?? 999,
          }),
        )
        .filter(
          item =>
            item.distance <
            DISTANCE_THRESHOLD,
        );

    console.log(
      '\n===== Retrieval =====',
    );

    console.log(
      'Question:',
      query,
    );

    if (
      filtered.length === 0
    ) {
      console.log(
        'No relevant chunks found.',
      );

      return {
        documents: [],
        metadatas: [],
        distances: [],
      };
    }

    filtered.forEach(
      (
        item,
        index,
      ) => {
        console.log(
          `Chunk ${
            index + 1
          }`,
        );

        console.log(
          'Distance:',
          item.distance,
        );

        console.log(
          item.document.slice(
            0,
            120,
          ),
        );

        console.log(
          '----------------',
        );
      },
    );

    return {
      documents:
        filtered.map(
          item =>
            item.document,
        ),

      metadatas:
        filtered.map(
          item =>
            item.metadata,
        ),

      distances:
        filtered.map(
          item =>
            item.distance,
        ),
    };
  }
}

export const retrievalService =
  new RetrievalService();