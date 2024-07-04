import config from '../../config';
import { omit } from '../utils/object-fns';
import validateSchema from './validateSchema';
import { PaginationQuerySchema, paginationQuerySchema } from '../schemas/pagination';
import { Dictionary } from '../interfaces';
import { Handler } from '../interfaces/server';

const paginate: Handler<Dictionary, null, Dictionary, PaginationQuerySchema> = async (req, _, next) => {
  const page = req.validated?.query?.page;
  const perPage = req.validated?.query?.perPage;

  if (!page || !perPage) return next();

  const restQs: Record<string, unknown> = omit(req.query, 'page', 'perPage');
  const skip = (page - 1) * perPage;

  const apiUrl = `${config.BASE_URL}:${config.PORT}` + req.originalUrl;
  const url = new URL(apiUrl);
  const prevUrl = page > 1 ? buildUrl(url, { page: page - 1, perPage, ...restQs }) : '';

  req.pagination = {
    query: { skip, take: perPage },
    createPagination: totalCount => {
      const pages = Math.ceil(totalCount / perPage);
      const nextUrl = page < pages ? buildUrl(url, { page: page + 1, perPage, ...restQs }) : '';
      return { page, pages, perPage, from: skip + 1, to: skip + perPage, prevUrl, nextUrl };
    },
  };

  next();
};

export default [validateSchema(paginationQuerySchema, 'query'), paginate];

function buildUrl(builder: URL, params: Record<string, unknown>): string {
  for (const [key, value] of Object.entries(params)) {
    builder.searchParams.set(key, typeof value === 'string' ? value : (value as any).toString());
  }
  return builder.href;
}
