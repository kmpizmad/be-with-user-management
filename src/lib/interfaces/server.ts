import { Request, Response } from 'express';
import { Dictionary, Pagination, ParsedQs } from '.';
import { DtoPagination } from './dto';
import { User } from '@prisma/client';

export type Handler<
  P extends Dictionary = Dictionary,
  ResBody extends Dictionary | null = Dictionary | null,
  ReqBody extends Dictionary = Dictionary,
  ReqQuery extends Dictionary = ParsedQs,
  LocalsObj extends Dictionary = Dictionary,
> = (
  req: RequestObject<P, ResBody, ReqBody, ReqQuery, LocalsObj>,
  res: ResponseObject<ResBody, LocalsObj>,
  next: NextFunction,
) => void;

export type ErrorHandler<
  P extends Dictionary = Dictionary,
  ReqBody extends Dictionary = Dictionary,
  ReqQuery extends Dictionary = ParsedQs,
  LocalsObj extends Dictionary = Dictionary,
> = (
  err: ErrorObject,
  req: Request<P, ErrorObject, ReqBody, ReqQuery, LocalsObj>,
  res: Response<ErrorResponseBody, LocalsObj>,
  next: NextFunction,
) => void;

/**
 * Overrides `express.Request`
 */
export type RequestObject<
  P extends Dictionary = Dictionary,
  ResBody extends Dictionary | null = Dictionary | null,
  ReqBody extends Dictionary = Dictionary,
  ReqQuery extends Dictionary = ParsedQs,
  LocalsObj extends Dictionary = Dictionary,
> = Request<P, ResponseBody<ResBody>, ReqBody, ReqQuery, LocalsObj> & {
  pagination?: { query: DtoPagination; createPagination: (totalCount: number) => Pagination };
  validated?: { query?: ReqQuery; body?: ReqBody };
  activeUser?: User & { roles: string[] };
};

/**
 * Overrides `express.Response`
 */
export type ResponseObject<
  ResBody extends Dictionary | null = Dictionary | null,
  LocalsObj extends Dictionary = Dictionary,
> = Response<ResponseBody<ResBody>, LocalsObj>;

/**
 * Overrides the `next` function
 */
export interface NextFunction {
  (err?: ErrorObject): void;
  (deferToNext: 'router'): void;
  (deferToNext: 'route'): void;
}

export type ResponseBody<T extends Dictionary | null = null> = {
  status: number;
  message: string;
  data: T | null;
};

export type ErrorObject = {
  name: 'VALIDATION_ERROR' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'INTERNAL_ERROR' | (string & {});
  status: number;
  message: string;
  errors?: string[];
  stack?: string;
};

type ErrorResponseBody = {
  name: string;
  status: number;
  message: string;
  errors?: string[];
  stack?: Record<string, unknown>;
};
