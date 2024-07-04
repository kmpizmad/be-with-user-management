import express, { Express, Router } from 'express';
import { ErrorHandler, Handler } from '../interfaces/server';

export class AuthServer {
  private __instance: Express;
  private __middlewares: Handler[] = [];
  private __routers: [string, (Router | Handler)[]][] = [];
  private __notFoundHandler: Handler | undefined;
  private __errorHandler: ErrorHandler | undefined;

  constructor() {
    this.__instance = express();
  }

  get instance(): Express {
    return this.__instance;
  }

  public stack(...handlers: Handler[]): void {
    for (const handler of handlers) {
      this.__middlewares.push(handler);
    }
  }

  public route(path: string, ...handlers: (Router | Handler)[]): void {
    if (path.includes('*')) throw new Error("Cannot use a wildcard for 'path'");
    this.__routers.push([path, handlers]);
  }

  public setGlobalNotFoundHandler(handler: Handler): void {
    if (this.__notFoundHandler) throw new Error("Cannot set a 'notFoundHandler' more than once");
    this.__notFoundHandler = handler;
  }

  public setGlobalErrorHandler(handler: ErrorHandler): void {
    if (this.__errorHandler) throw new Error("Cannot set an 'errorHandler' more than once");
    this.__errorHandler = handler;
  }

  public start(port: number) {
    this.__middlewares.forEach(middleware => this.__instance.use(middleware));
    this.__routers.forEach(([path, router]) => this.__instance.use(path, router));

    if (this.__notFoundHandler) this.__instance.all('*', this.__notFoundHandler);
    if (this.__errorHandler) this.__instance.use(this.__errorHandler);

    this.__instance.listen(port, () => console.log(`Server started on port ${port}`));
  }
}
