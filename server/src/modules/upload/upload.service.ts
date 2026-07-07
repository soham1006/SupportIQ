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
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'supportiq/documents',
        resource_type: 'raw',
      },
      async (error, result) => {
        try {
          if (error || !result) {
            return reject(error);
          }

          const extractedText = await pdfService.extractText(file.buffer);

          const chunks =
  await chunkService.split(extractedText);

  const embeddings =
  await embeddingService.embedMany(chunks);

console.log(
  `Created ${chunks.length} chunks`,
);

console.log('\n========== PDF TEXT ==========\n');

console.log(extractedText);

console.log('\n==============================\n');

          const document =
            await uploadRepository.createDocument({
              title: file.originalname,
              originalName: file.originalname,
              fileUrl: result.secure_url,
              publicId: result.public_id,
              fileType: file.mimetype,
              fileSize: file.size,
              status: 'READY',

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
            });

            console.log('Chunks:', chunks.length);
console.log('Embeddings:', embeddings.length);

if (embeddings.length > 0) {
  console.log(
    'Embedding dimension:',
    embeddings[0].length,
  );
}
await vectorService.store(
  document.id,
  document.originalName,
  organizationId,
  chunks,
  embeddings,
);

console.log('Vectors stored in ChromaDB');

      resolve({
  document,

  chunkCount: chunks.length,

  embeddingCount: embeddings.length,

  message:
    'Document indexed successfully',
});
        } catch (err) {
          reject(err);
        }
      },
    );

    stream.end(file.buffer);
  });
}
}

export const uploadService = new UploadService();