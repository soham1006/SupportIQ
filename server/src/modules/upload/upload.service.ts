import cloudinary from '../../config/cloudinary';

import { uploadRepository } from './upload.repository';

import { pdfService } from '../ai/pdf.service';
import { chunkService } from '../ai/chunk.service';
import { embeddingService } from '../ai/embedding.service';
import { vectorService } from '../ai/vector.service';

export class UploadService {
  async uploadDocument(
    file: Express.Multer.File,
    organizationId: string,
    uploadedById: string,
  ) {
    return new Promise(
      (resolve, reject) => {
        const stream =
          cloudinary.uploader.upload_stream(
            {
              folder:
                'supportiq/documents',

              resource_type: 'raw',
            },

            async (
              error,
              result,
            ) => {
              if (
                error ||
                !result
              ) {
                return reject(
                  error ??
                    new Error(
                      'Cloudinary upload failed',
                    ),
                );
              }

              let documentId:
                | string
                | null = null;

              try {
                /* Extract PDF text */

                const extractedText =
                  await pdfService.extractText(
                    file.buffer,
                  );

                /* Split into chunks */

                const chunks =
                  await chunkService.split(
                    extractedText,
                  );

                if (
                  chunks.length === 0
                ) {
                  throw new Error(
                    'No text chunks could be created from this document',
                  );
                }

                console.log(
                  `Created ${chunks.length} chunks`,
                );

                /* Generate embeddings */

                const embeddings =
                  await embeddingService.embedMany(
                    chunks,
                  );

                if (
                  embeddings.length !==
                  chunks.length
                ) {
                  throw new Error(
                    'Chunk and embedding counts do not match',
                  );
                }

                console.log(
                  'Chunks:',
                  chunks.length,
                );

                console.log(
                  'Embeddings:',
                  embeddings.length,
                );

                if (
                  embeddings.length >
                  0
                ) {
                  console.log(
                    'Embedding dimension:',
                    embeddings[0]
                      .length,
                  );
                }

                /* Create document as processing */

                const document =
                  await uploadRepository.createDocument(
                    {
                      title:
                        file.originalname,

                      originalName:
                        file.originalname,

                      fileUrl:
                        result.secure_url,

                      publicId:
                        result.public_id,

                      fileType:
                        file.mimetype,

                      fileSize:
                        file.size,

                      status:
                        'PROCESSING',

                      organization: {
                        connect: {
                          id: organizationId,
                        },
                      },

                      uploadedBy: {
                        connect: {
                          id: uploadedById,
                        },
                      },
                    },
                  );

                documentId =
                  document.id;

                /* Store chunks in PostgreSQL */

                await uploadRepository.createChunks(
                  document.id,
                  chunks,
                );

                console.log(
                  'Chunks stored in PostgreSQL',
                );

                /* Store embeddings in Chroma */

                await vectorService.store(
                  document.id,
                  document.originalName,
                  organizationId,
                  chunks,
                  embeddings,
                );

                console.log(
                  'Vectors stored in ChromaDB',
                );

                /* Mark document ready */

                const readyDocument =
                  await uploadRepository.updateDocumentStatus(
                    document.id,
                    'READY',
                  );

                return resolve({
                  document:
                    readyDocument,

                  chunkCount:
                    chunks.length,

                  embeddingCount:
                    embeddings.length,

                  message:
                    'Document indexed successfully',
                });
              } catch (err) {
                /*
                 * If the document was already
                 * created, mark it as failed.
                 */

                if (documentId) {
                  try {
                    await uploadRepository.updateDocumentStatus(
                      documentId,
                      'FAILED',
                    );
                  } catch (
                    statusError
                  ) {
                    console.error(
                      'Failed to update document status:',
                      statusError,
                    );
                  }
                }

                return reject(err);
              }
            },
          );

        stream.end(
          file.buffer,
        );
      },
    );
  }
}

export const uploadService =
  new UploadService();