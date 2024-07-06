import { z } from 'zod';

const emailSchema = z
  .string({ required_error: "'email' is required", invalid_type_error: "'email' must be type of string" })
  .email();

const passwordSchema = z.string({
  required_error: "'password' is required",
  invalid_type_error: "'password' must be type of string",
});

const firstNameSchema = z.string({
  required_error: "'firstName' is required",
  invalid_type_error: "'firstName' must be type of string",
});

const lastNameSchema = z.string({
  required_error: "'lastName' is required",
  invalid_type_error: "'lastName' must be type of string",
});

const createRoleSchema = (fieldName: string) => {
  return z
    .array(z.string({ invalid_type_error: `Items of '${fieldName}' must be type of string` }), {
      required_error: `'${fieldName}' is required`,
    })
    .min(1, { message: `'${fieldName}' must contain at least 1 item` });
};

export const userRegisterSchema = z.object({
  email: emailSchema,
  password: passwordSchema.min(8, { message: "'password' must contain at least 8 characters" }),
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  active: z.boolean({ invalid_type_error: "'active' must be type of boolean" }).optional(),
  roles: createRoleSchema('roles'),
});

export const userLoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const userInfoSchema = z.object({
  firstName: firstNameSchema.optional(),
  lastName: lastNameSchema.optional(),
  password: passwordSchema.min(8, { message: "'password' must contain at least 8 characters" }).optional(),
});

export const userRoleSchema = z.object({
  roles: createRoleSchema('roles').optional(),
  removeRoles: createRoleSchema('removeRoles').optional(),
});

export const userDeleteSchema = z.object({
  type: z.enum(['soft', 'delete'], {
    invalid_type_error: "'type' must be one of 'soft' or 'delete'",
    required_error: "'type' is required",
  }),
});

export type UserRegisterSchema = z.infer<typeof userRegisterSchema>;
export type UserLoginSchema = z.infer<typeof userLoginSchema>;
export type UserInfoSchema = z.infer<typeof userInfoSchema>;
export type UserRoleSchema = z.infer<typeof userRoleSchema>;
export type UserDeleteSchema = z.infer<typeof userDeleteSchema>;
