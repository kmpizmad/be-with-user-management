import { z } from 'zod';

export const userRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string(),
  lastName: z.string(),
  active: z.boolean().optional(),
  role: z.string(),
});

export type UserRegisterSchema = z.infer<typeof userRegisterSchema>;

export const userLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type UserLoginSchema = z.infer<typeof userLoginSchema>;
