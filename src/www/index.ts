import config from '../config';
import { AuthServer } from '../lib/server';
import cors from 'cors';
import bodyParser from 'body-parser';
import { apiRouter } from '../routes';
import { createObjectFromArray, omit } from '../lib/utils/object-fns';
import { logger } from '../clients';
import { Handler } from '../lib/interfaces/server';

export const server = new AuthServer();

server.stack(cors());
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
  const stack = createObjectFromArray(err.stack?.split('\n') || []);
  const errResponse = config.NODE_ENV !== 'production' ? { ...err, stack } : omit(err, 'stack');
  logger.error(errResponse.message, errResponse);
  res.status(status).json(errResponse);
});
