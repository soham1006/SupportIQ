import { z } from 'zod';

export const createCustomerSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(100),

    email: z
      .string()
      .trim()
      .email('Invalid email'),

    password: z
      .string()
      .min(
        8,
        'Password must be at least 8 characters',
      ),
  }),
});

export type CreateCustomerInput =
  z.infer<
    typeof createCustomerSchema
  >['body'];

export const updateCustomerSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .optional(),

    isActive: z
      .boolean()
      .optional(),
  }),
});

export type UpdateCustomerInput =
  z.infer<
    typeof updateCustomerSchema
  >['body'];