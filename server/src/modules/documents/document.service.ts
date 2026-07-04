import { ApiError } from '../../utils/ApiError';
import { documentRepository } from './document.repository';

export class DocumentService {
  async getAll(
    organizationId: string,
  ) {
    return documentRepository.findAll(
      organizationId,
    );
  }

  async getById(
    documentId: string,
    organizationId: string,
  ) {
    const document =
      await documentRepository.findById(
        documentId,
        organizationId,
      );

    if (!document) {
      throw new ApiError(
        404,
        'Document not found',
      );
    }

    return document;
  }

  async delete(
    documentId: string,
    organizationId: string,
  ) {
    const result =
      await documentRepository.delete(
        documentId,
        organizationId,
      );

    if (result.count === 0) {
      throw new ApiError(
        404,
        'Document not found',
      );
    }

    return {
      message:
        'Document deleted successfully',
    };
  }
}

export const documentService =
  new DocumentService();