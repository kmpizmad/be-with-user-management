import { createRouter } from '@lib/server';
import { protectedRoute, validateSchema } from '@lib/middlewares';
import { userLoginSchema, userRegisterSchema } from '@lib/schemas/user';
import v1Router from '@v1/routes';
import { credentials } from '@v1/controllers';

export const apiRouter = createRouter(router => {
  router.post('/credentials/register', validateSchema(userRegisterSchema, 'body'), credentials.register);
  router.post('/credentials/login', validateSchema(userLoginSchema, 'body'), credentials.login);
  router.post('/credentials/refresh', protectedRoute, credentials.refresh);
  router.use('/v1', v1Router);
});
