import { z } from 'zod';

export const chatSchema = z.object({
  body: z.object({
    question: z.string().trim().min(3).max(2000),

    conversationId: z.string().optional(),
  }),
});

export type ChatInput =
  z.infer<typeof chatSchema>['body'];