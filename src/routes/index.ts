import createRouter from '../lib/server/createRouter';
import auth from '../controllers/auth';
import credentials from '../controllers/credentials';
import v1Router from './v1';
import { validateSchema } from '../lib/middlewares';
import { userRegisterSchema } from '../lib/schemas/user';
import protectedRoute from '../lib/middlewares/protectedRoute';

export const apiRouter = createRouter(router => {
  router.post('/register', validateSchema(userRegisterSchema, 'body'), auth.register);
  router.post('/login', auth.login);
  router.post('/credentials/token', credentials.createToken);
  router.post('/credentials/refresh', credentials.refreshToken);
  router.use('/v1', protectedRoute, v1Router);
});
