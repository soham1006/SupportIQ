import { z } from 'zod';
import {
  TicketPriority,
  TicketStatus,
} from '@prisma/client';

/* ---------------- Create Ticket ---------------- */

export const createTicketSchema = z.object({
  body: z.object({
    subject: z
      .string()
      .trim()
      .min(3)
      .max(200),

    description: z
      .string()
      .trim()
      .min(10)
      .max(5000),

    priority: z.nativeEnum(
      TicketPriority,
    ),
  }),
});

export type CreateTicketInput =
  z.infer<
    typeof createTicketSchema
  >['body'];

/* ---------------- Create Reply ---------------- */

export const createReplySchema =
  z.object({
    body: z.object({
      message: z
        .string()
        .trim()
        .min(1)
        .max(5000),
    }),
  });

export type CreateReplyInput =
  z.infer<
    typeof createReplySchema
  >['body'];

/* ---------------- Update Status ---------------- */

export const updateTicketStatusSchema =
  z.object({
    body: z.object({
      status: z.nativeEnum(
        TicketStatus,
      ),
    }),
  });

export type UpdateTicketStatusInput =
  z.infer<
    typeof updateTicketStatusSchema
  >['body'];

/* ---------------- Assign Ticket ---------------- */

export const assignTicketSchema =
  z.object({
    body: z.object({
      agentId: z
        .string()
        .cuid(),
    }),
  });

export type AssignTicketInput =
  z.infer<
    typeof assignTicketSchema
  >['body'];