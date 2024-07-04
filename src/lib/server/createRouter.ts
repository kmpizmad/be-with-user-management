import express, { IRouterMatcher, Router } from 'express';
import { Prettify } from '../interfaces';
import { Handler } from '../interfaces/server';

function createRouter(factory: (router: CustomRouter) => void) {
  const router = express.Router();
  factory(router);
  return router;
}

export default createRouter;

type CustomRouter = Prettify<{
  [P in keyof Router]: Router[P] extends IRouterMatcher<Router>
    ? (path: string, ...handlers: Handlers[]) => void
    : Router[P];
}>;

type Handlers = Handler<any, any, any, any> | Handler<any, any, any, any>[];
