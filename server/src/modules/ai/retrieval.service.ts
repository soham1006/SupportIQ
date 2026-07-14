import { embeddingService } from './embedding.service';
import { getCollection } from './chroma.service';

export class RetrievalService {
  async search(
    query: string,
    organizationId: string,
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

        where: {
          organizationId,
        },
      });

    const documents =
      result.documents?.[0] ?? [];

    const distances =
      result.distances?.[0] ?? [];

    const metadatas =
      result.metadatas?.[0] ?? [];

    const retrieved =
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
              ] ?? null,
          }),
        )
        .filter(
          (
            item,
          ): item is {
            document: string;
            metadata:
              | Record<
                  string,
                  boolean |
                    number |
                    string
                >
              | null;
            distance:
              | number
              | null;
          } =>
            item.document !==
            null,
        );

    console.log(
      '\n===== Organization Retrieval =====',
    );

    console.log(
      'Organization:',
      organizationId,
    );

    console.log(
      'Question:',
      query,
    );

    console.log(
      'Results found:',
      retrieved.length,
    );

    retrieved.forEach(
      (
        item,
        index,
      ) => {
        console.log(
          `\nChunk ${
            index + 1
          }`,
        );

        console.log(
          'Distance:',
          item.distance,
        );

        console.log(
          'Metadata:',
          item.metadata,
        );

        console.log(
          'Document:',
          item.document.slice(
            0,
            300,
          ),
        );

        console.log(
          '----------------',
        );
      },
    );

    return {
      documents:
        retrieved.map(
          (item) =>
            item.document,
        ),

      metadatas:
        retrieved.map(
          (item) =>
            item.metadata,
        ),

      distances:
        retrieved
          .map(
            (item) =>
              item.distance,
          )
          .filter(
            (
              distance,
            ): distance is number =>
              distance !== null,
          ),
    };
  }
}

export const retrievalService =
  new RetrievalService();