import { z } from 'zod';

export const uploadDocumentSchema = z.object({
  body: z.object({}).strict(),
});