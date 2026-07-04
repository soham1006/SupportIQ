import { prisma } from '../../database/prisma';

export class DocumentRepository {
  async findAll(
    organizationId: string,
  ) {
   return prisma.document.findMany({
  where: {
    organizationId,
  },

  include: {
    uploadedBy: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },

    _count: {
      select: {
        chunks: true,
      },
    },
  },

  orderBy: {
    createdAt: 'desc',
  },
});
  }

  async findById(
    documentId: string,
    organizationId: string,
  ) {
    return prisma.document.findFirst({
      where: {
        id: documentId,
        organizationId,
      },

     include: {
  uploadedBy: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },

  _count: {
    select: {
      chunks: true,
    },
  },
}
    });
  }

  async delete(
    documentId: string,
    organizationId: string,
  ) {
    return prisma.document.deleteMany({
      where: {
        id: documentId,
        organizationId,
      },
    });
  }
}

export const documentRepository =
  new DocumentRepository();