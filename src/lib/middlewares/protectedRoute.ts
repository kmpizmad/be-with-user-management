import * as jwt from 'jsonwebtoken';
import createController from '../server/createController';
import { handleInvalidToken } from '../error-handlers/token';
import userRepository from '../../dto/user.repository';
import config from '../../config';

type Token = jwt.JwtPayload;

const protectedRoute = createController(async (req, _, next) => {
  const authorization = req.headers['authorization'];
  if (!authorization) {
    next({ status: 401, name: 'UNAUTHORIZED', message: 'Missing authorization header' });
    return;
  }

  const [, token] = authorization.split(' ');
  if (!token) {
    next({ status: 401, name: 'UNAUTHORIZED', message: 'Missing token' });
    return;
  }

  const decodedToken = jwt.verify(token, config.ACCESS_TOKEN_SECRET) as Token;
  if (!decodedToken.sub) {
    next({ status: 401, name: 'UNAUTHORIZED', message: 'Missing subject' });
    return;
  }

  const user = await userRepository.findById(decodedToken.sub);
  req.activeUser = user;
  next();
}, handleInvalidToken);

export default protectedRoute;
