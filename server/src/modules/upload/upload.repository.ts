import {
  DocumentStatus,
  Prisma,
} from '@prisma/client';

import { prisma } from '../../database/prisma';

export class UploadRepository {
  async createDocument(
    data: Prisma.DocumentCreateInput,
  ) {
    return prisma.document.create({
      data,
    });
  }

  async createChunks(
    documentId: string,
    chunks: string[],
  ) {
    return prisma.documentChunk.createMany({
      data: chunks.map(
        (
          content,
          index,
        ) => ({
          documentId,
          chunkIndex: index,
          content,

          tokenCount: content
            .split(/\s+/)
            .filter(Boolean)
            .length,
        }),
      ),
    });
  }

  async updateDocumentStatus(
    documentId: string,
    status: DocumentStatus,
  ) {
    return prisma.document.update({
      where: {
        id: documentId,
      },

      data: {
        status,
      },
    });
  }
}

export const uploadRepository =
  new UploadRepository();