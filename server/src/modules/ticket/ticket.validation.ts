import { z } from 'zod';
import { TicketStatus } from '@prisma/client';

export const createReplySchema = z.object({
  body: z.object({
    message: z
      .string()
      .trim()
      .min(1)
      .max(5000),
  }),
});

export type CreateReplyInput =
  z.infer<typeof createReplySchema>['body'];

export const updateTicketStatusSchema = z.object({
  body: z.object({
    status: z.nativeEnum(TicketStatus),
  }),
});

export type UpdateTicketStatusInput =
  z.infer<typeof updateTicketStatusSchema>['body'];

  export const assignTicketSchema = z.object({
  body: z.object({
    agentId: z.string().cuid(),
  }),
});

export type AssignTicketInput =
  z.infer<typeof assignTicketSchema>['body'];