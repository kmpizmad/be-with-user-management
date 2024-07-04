import z from 'zod';
import { ZodError } from 'zod-validation-error';

export function isZodError(obj: unknown): obj is ZodError {
  return (
    !!obj &&
    typeof obj === 'object' &&
    (Object.hasOwn(obj, 'issues') || Object.hasOwn(obj, 'details')) &&
    Object.hasOwn(obj, 'name')
  );
}

export type ZodSchema =
  | z.ZodEffects<z.ZodTypeAny, unknown, unknown>
  | z.ZodObject<z.ZodRawShape, z.UnknownKeysParam, z.ZodTypeAny, unknown, unknown>;
