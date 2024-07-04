import * as jwt from 'jsonwebtoken';
import createController from '../server/createController';
import userRepository from '../../dto/user.repository';

type Token = jwt.JwtPayload & { id: string };

const allowRoles = (roles: string[]) => {
  return createController<{ appId: string }>(async (req, _, next) => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      next({ status: 401, name: 'UNAUTHORIZED', message: 'Missing token' });
      return;
    }

    const [, token] = authorization.split(' ');
    if (!token) {
      next({ status: 401, name: 'UNAUTHORIZED', message: 'Missing token' });
      return;
    }

    if (!req.appSecret) {
      next({ status: 403, name: 'FORBIDDEN', message: 'Invalid secret' });
      return;
    }

    const decodedToken = jwt.verify(token, req.appSecret) as Token;
    const user = await userRepository.findById(decodedToken.id);

    if (!roles.some(role => user.roles.includes(role))) {
      next({ status: 403, name: 'FORBIDDEN', message: 'Access denied' });
      return;
    }

    next();
  });
};

export default allowRoles;
