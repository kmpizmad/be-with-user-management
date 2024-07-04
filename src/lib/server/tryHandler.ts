import { Dictionary, ParsedQs } from '../interfaces';
import { ErrorObject, Handler, RequestObject } from '../interfaces/server';

function tryHandler<
  ResBody extends Dictionary | null = Dictionary,
  ReqBody extends Dictionary = Dictionary,
  P extends Dictionary = Dictionary,
  ReqQuery extends ParsedQs = ParsedQs,
  LocalsObj extends Dictionary = Dictionary,
>(
  handler: Handler<P, ResBody, ReqBody, ReqQuery, LocalsObj>,
  ...errorHandlers: CatchHandler<P, ResBody, ReqBody, ReqQuery, LocalsObj>[]
): Handler<P, ResBody, ReqBody, ReqQuery, LocalsObj> {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error: any) {
      const cases: [boolean, ErrorObject][] = errorHandlers.map(handler => handler(error, req));
      const firstTruthy: [boolean, ErrorObject] | undefined = cases.find(([condition]) => condition);
      const message: ErrorObject = firstTruthy
        ? firstTruthy[1]
        : { name: 'INTERNAL', status: 500, message: 'Unknown error occurred', stack: error.stack };
      next(message);
    }
  };
}

export default tryHandler;

export type CatchHandler<
  P extends Dictionary = Dictionary,
  ResBody extends Dictionary | null = Dictionary,
  ReqBody extends Dictionary = Dictionary,
  ReqQuery extends ParsedQs = ParsedQs,
  LocalsObj extends Dictionary = Dictionary,
> = (error: any, req: RequestObject<P, ResBody, ReqBody, ReqQuery, LocalsObj>) => [boolean, ErrorObject];
