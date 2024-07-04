import credentials from '../controllers/credentials';
import validateApiKey from '../lib/middlewares/validateApiKey';
import createRouter from '../lib/server/createRouter';
import v1Router from './v1';

export const apiRouter = createRouter(router => {
  router.use('/v1', validateApiKey, v1Router);
  router.post('/generate/credentials/app', credentials.appCredentials);
  router.post('/generate/credentials/token', credentials.tokenCredentials);
  router.post('/generate/credentials/refresh', credentials.refreshTokenCredentials);
});
