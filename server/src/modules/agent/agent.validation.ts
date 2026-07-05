import { z } from 'zod';

export const createAgentSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100),

    email: z.string().email(),

    password: z.string().min(6),

    skills: z.array(z.string()).default([]),
  }),
});

export type CreateAgentInput =
  z.infer<
    typeof createAgentSchema
  >['body'];

export const updateAgentSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100).optional(),

    skills: z.array(z.string()).optional(),

    isActive: z.boolean().optional(),
  }),
});

export type UpdateAgentInput =
  z.infer<
    typeof updateAgentSchema
  >['body'];