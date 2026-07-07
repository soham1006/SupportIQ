import { z } from 'zod';

export const registerSchema =
  z
    .object({
      organizationName: z
        .string()
        .min(2),

      name: z
        .string()
        .min(2),

      email: z
        .email(),

      password: z
        .string()
        .min(8),

      confirmPassword: z
        .string(),
    })
    .refine(
      data =>
        data.password ===
        data.confirmPassword,
      {
        path: [
          'confirmPassword',
        ],
        message:
          'Passwords do not match',
      },
    );

export type RegisterForm =
  z.infer<
    typeof registerSchema
  >;