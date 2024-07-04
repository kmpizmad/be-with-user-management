import { z } from 'zod';
import { parseIntWithFallback } from '../utils/parsers';

export const paginationQuerySchema = z.object({
  page: z
    .string()
    .regex(/^[0-9]+$/, "Parameter 'page' must be a number")
    .optional()
    .transform(value => parseIntWithFallback(value)),
  perPage: z
    .string()
    .regex(/^[0-9]+$/, "Parameter 'perPage' must be a number")
    .optional()
    .transform(value => parseIntWithFallback(value)),
});

export type PaginationQuerySchema = z.infer<typeof paginationQuerySchema>;
