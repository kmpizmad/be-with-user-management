import { fromZodError } from 'zod-validation-error';
import { ZodSchema, isZodError } from '../utils/validation';
import { ParsedQs } from '../interfaces';
import { Handler } from '../interfaces/server';

const validateSchema = (schema: ZodSchema, containingObject: 'query' | 'body'): Handler => {
  return (req, _, next) => {
    try {
      req.validated = { query: {}, body: {} };
      if (containingObject === 'query') req.validated.query = schema.parse(req.query) as ParsedQs;
      if (containingObject === 'body') req.validated.body = schema.parse(req.body) as ParsedQs;
      next();
    } catch (error) {
      if (isZodError(error)) {
        const zodError = fromZodError(error, { includePath: false, prefix: null });
        next({ name: zodError.name, status: 400, message: zodError.message, stack: zodError.stack });
      } else {
        next();
      }
    }
  };
};

export default validateSchema;
