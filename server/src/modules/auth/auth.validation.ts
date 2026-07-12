import { z } from 'zod';

export const registerSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .trim()
        .min(3, 'Name must be at least 3 characters')
        .max(100),

      email: z
        .string()
        .trim()
        .email('Invalid email address')
        .toLowerCase(),

      password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(100),
organizationName: z
  .string()
  .min(2, 'Organization name is required')
  .max(100)
    })
    .strict(),
});

export const loginSchema = z.object({
  body: z
    .object({
      email: z
        .string()
        .trim()
        .email()
        .toLowerCase(),

      password: z.string().min(1),
    })
    .strict(),
});


export const refreshTokenSchema = z.object({
  body: z.object({}).strict(),
});

export const logoutSchema = z.object({
  body: z.object({}).strict(),
});

export type RegisterInput = z.infer<typeof registerSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];

export const customerRegisterSchema =
  z.object({
    body: z.object({
      name: z
        .string()
        .trim()
        .min(
          2,
          'Name must be at least 2 characters',
        )
        .max(100),

      email: z
        .string()
        .trim()
        .email(
          'Invalid email address',
        ),

      password: z
        .string()
        .min(
          8,
          'Password must be at least 8 characters',
        ),

      workspaceSlug: z
        .string()
        .trim()
        .min(
          1,
          'Workspace is required',
        ),
    }),
  });

export type CustomerRegisterInput =
  z.infer<
    typeof customerRegisterSchema
  >['body'];