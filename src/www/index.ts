import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { apiRouter } from '../routes';
import { CustomServer } from '../lib/server';
import { mapObject, omit } from '../lib/utils/object-fns';
import { logger } from '../clients';
import { Handler } from '../lib/interfaces/server';
import config from '../config';

export const server = new CustomServer();

server.stack(cors({ origin: config.CORS_ORIGINS, credentials: true }));
server.stack(cookieParser() as Handler);
server.stack(bodyParser.urlencoded({ extended: true }));
server.stack(bodyParser.json());

server.route('/healthcheck', ((_, res) => res.sendStatus(200)) as Handler);
server.route('/api', apiRouter);

server.setGlobalNotFoundHandler((req, _, next) => {
  const error = new Error(`Could not find ${req.originalUrl}`);
  error.name = 'NOTFOUND';
  next({ name: error.name, status: 404, message: error.message, stack: error.stack });
});

server.setGlobalErrorHandler((err, _, res, __) => {
  const status = err.status || 500;
  const stack = mapObject(err.stack?.split('\n') || [], (item, i) => {
    return { [`#${i + 1}`]: typeof item === 'string' ? item.trim() : item };
  });
  const errResponse = config.NODE_ENV !== 'production' ? { ...err, stack } : omit(err, 'stack');
  logger.error({ ...errResponse });
  res.status(status).json(errResponse);
});
