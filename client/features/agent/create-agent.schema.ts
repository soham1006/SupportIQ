import { z } from 'zod';

export const createAgentSchema =
  z.object({
    name: z
      .string()
      .min(2, 'Name is required'),

    email: z
      .email('Invalid email'),

    password: z
      .string()
      .min(
        8,
        'Password must be at least 8 characters',
      ),

    skills: z.array(z.string()),
  });

export type CreateAgentForm =
  z.infer<
    typeof createAgentSchema
  >;