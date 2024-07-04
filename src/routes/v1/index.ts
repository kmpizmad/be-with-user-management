import createRouter from '../../lib/server/createRouter';

const v1Router = createRouter(router => {
  router.get('/users');
  router.get('/users/:id');
  router.post('/users');
  router.patch('/users/:id');
  router.delete('/users/:id');
});

export default v1Router;
