import createRouter from '../lib/server/createRouter';
import v1Router from './v1';
import credentials from '../controllers/credentials';
import { validateSchema } from '../lib/middlewares';
import { userLoginSchema, userRegisterSchema } from '../lib/schemas/user';
import protectedRoute from '../lib/middlewares/protectedRoute';

export const apiRouter = createRouter(router => {
  router.post('/credentials/register', validateSchema(userRegisterSchema, 'body'), credentials.register);
  router.post('/credentials/login', validateSchema(userLoginSchema, 'body'), credentials.login);
  router.post('/credentials/refresh', credentials.refresh);
  router.use('/v1', protectedRoute, v1Router);
});
