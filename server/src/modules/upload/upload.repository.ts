import { Prisma } from '@prisma/client';
import { prisma } from '../../database/prisma';

export class UploadRepository {
  async createDocument(data: Prisma.DocumentCreateInput) {
    return prisma.document.create({
      data,
    });
  }
}

export const uploadRepository = new UploadRepository();