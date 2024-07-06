import createRouter from '../../lib/server/createRouter';
import users from '../../controllers/v1/users';
import protectedRoute from '../../lib/middlewares/protectedRoute';
import { paginate, validateSchema } from '../../lib/middlewares';
import { userDeleteSchema, userInfoSchema, userRoleSchema } from '../../lib/schemas/user';

const userRouter = createRouter(router => {
  router.get('/users', paginate, users.getAll);
  router.get('/users/:id', users.getOne);
  router.post('/users/:id/info', validateSchema(userInfoSchema, 'body'), users.updateInfo);
  router.post('/users/:id/role', validateSchema(userRoleSchema, 'body'), users.updateRole);
  router.post('/users/:id/activate', users.activate);
  router.post('/users/:id/deactivate', users.deactivate);
  router.delete('/users/:id', validateSchema(userDeleteSchema, 'body'), users.deleteOne);
});

const v1Router = createRouter(router => {
  router.use('/', protectedRoute, userRouter);
});

export default v1Router;
