import { Dictionary, ParsedQs } from '../interfaces';
import { Handler } from '../interfaces/server';
import tryHandler, { CatchHandler } from './tryHandler';

function createController<
  ResBody extends Dictionary | null = Dictionary,
  ReqBody extends Dictionary = Dictionary,
  P extends Dictionary = Dictionary,
  ReqQuery extends ParsedQs = ParsedQs,
  LocalsObj extends Dictionary = Dictionary,
>(
  handler: Handler<P, ResBody, ReqBody, ReqQuery, LocalsObj>,
  ...errorHandlers: CatchHandler<P, ResBody, ReqBody, ReqQuery, LocalsObj>[]
): Handler<P, ResBody, ReqBody, ReqQuery, LocalsObj> {
  return tryHandler(handler, ...errorHandlers, error => [
    !!error.name && !!error.message,
    { name: error.name, status: 400, message: error.message, stack: error.stack },
  ]);
}

export default createController;
