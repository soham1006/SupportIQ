import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2)
      .max(100),
  }),
});

export type UpdateProfileInput =
  z.infer<
    typeof updateProfileSchema
  >['body'];

export const changePasswordSchema =
  z.object({
    body: z
      .object({
        currentPassword:
          z.string().min(6),

        newPassword:
          z.string().min(6),

        confirmPassword:
          z.string().min(6),
      })
      .refine(
        (data) =>
          data.newPassword ===
          data.confirmPassword,
        {
          message:
            'Passwords do not match',
          path: [
            'confirmPassword',
          ],
        },
      ),
  });

export type ChangePasswordInput =
  z.infer<
    typeof changePasswordSchema
  >['body'];