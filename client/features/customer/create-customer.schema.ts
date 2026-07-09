import { z } from 'zod';

export const createCustomerSchema =
  z.object({
    name: z
      .string()
      .min(2),

    email: z
      .email(),

    password: z
      .string()
      .min(8),
  });

export type CreateCustomerForm =
  z.infer<
    typeof createCustomerSchema
  >;