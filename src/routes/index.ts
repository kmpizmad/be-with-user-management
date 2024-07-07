import { protectedRoute, validateSchema } from '@lib/middlewares';
import { userLoginSchema, userRegisterSchema } from '@lib/schemas/user';
import { createRouter } from '@lib/server';

import { credentials } from '@v1/controllers';
import v1Router from '@v1/routes';

export const apiRouter = createRouter(router => {
  router.post('/credentials/register', validateSchema(userRegisterSchema, 'body'), credentials.register);
  router.post('/credentials/login', validateSchema(userLoginSchema, 'body'), credentials.login);
  router.post('/credentials/refresh', protectedRoute, credentials.refresh);
  router.use('/v1', v1Router);
});
