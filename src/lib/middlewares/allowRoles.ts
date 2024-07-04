import createController from '../server/createController';

const allowRoles = (roles: string[]) => {
  return createController(async (req, _, next) => {
    const user = req.activeUser;
    if (!user) {
      next({ status: 401, name: 'UNAUTHORIZED', message: 'No active user' });
      return;
    }

    if (!roles.some(role => user.roles.includes(role))) {
      next({ status: 403, name: 'FORBIDDEN', message: 'Access denied' });
      return;
    }

    next();
  });
};

export default allowRoles;
