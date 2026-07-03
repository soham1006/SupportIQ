import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  PORT: z.coerce.number().default(5000),

  DATABASE_URL: z.string(),

  JWT_ACCESS_SECRET: z.string().min(32),

  JWT_REFRESH_SECRET: z.string().min(32),

  GEMINI_API_KEY: z.string(),

  CLOUDINARY_CLOUD_NAME: z.string(),

  CLOUDINARY_API_KEY: z.string(),

  CLOUDINARY_API_SECRET: z.string(),

  ACCESS_TOKEN_EXPIRES_IN: z.string().default('15m'),

REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),
});

export const env = envSchema.parse(process.env);