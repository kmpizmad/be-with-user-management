import { z } from 'zod';

const emailSchema = z
  .string({ required_error: "'email' is required", invalid_type_error: "'email' must be type of string" })
  .email();

const passwordSchema = z.string({
  required_error: "'password' is required",
  invalid_type_error: "'password' must be type of string",
});

export const userRegisterSchema = z.object({
  email: emailSchema,
  password: passwordSchema.min(8),
  firstName: z.string({
    required_error: "'firstName' is required",
    invalid_type_error: "'firstName' must be type of string",
  }),
  lastName: z.string({
    required_error: "'lastName' is required",
    invalid_type_error: "'lastName' must be type of string",
  }),
  active: z.boolean({ invalid_type_error: "'active' must be type of boolean" }).optional(),
  roles: z.array(z.string({ invalid_type_error: "Items of 'roles' must be type of string" }), {
    required_error: "'roles' is required",
  }),
});

export type UserRegisterSchema = z.infer<typeof userRegisterSchema>;

export const userLoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type UserLoginSchema = z.infer<typeof userLoginSchema>;
