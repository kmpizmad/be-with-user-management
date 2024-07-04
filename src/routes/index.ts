import createRouter from '../lib/server/createRouter';
import auth from '../controllers/auth';
import credentials from '../controllers/credentials';
import v1Router from './v1';

export const apiRouter = createRouter(router => {
  router.post('/register', auth.register);
  router.post('/login', auth.login);
  router.post('/credentials/token', credentials.createToken);
  router.post('/credentials/refresh', credentials.refreshToken);
  router.use('/v1', v1Router);
});
