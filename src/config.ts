import { z } from 'zod';

const env = z.object({
  NODE_ENV: z.enum(['production', 'development', 'staging']).optional().default('development'),
  BASE_URL: z.string().optional().default('http://localhost'),
  PORT: z
    .string()
    .optional()
    .default('8080')
    .transform(value => parseInt(value) || 8080),
  DATABASE_URL: z.string().optional().default('postgresql://postgres:root@localhost:5432/auth_system'),
  JWT_SECRET: z.string().optional().default('mysecret'),
});

const config = env.parse(process.env);

export default config;
