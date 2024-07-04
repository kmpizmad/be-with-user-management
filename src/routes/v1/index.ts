import createRouter from '../../lib/server/createRouter';

const v1Router = createRouter(router => {
  router.post('/:appId/users');
});

export default v1Router;
