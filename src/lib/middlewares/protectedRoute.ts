import * as jwt from 'jsonwebtoken';

import { createController } from '@lib/server';

import userService from '@services/user.service';

import config from '@config';

import { handleInvalidToken } from 'src/lib/error-handlers/token';

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

  const user = await userService.findById(decodedToken.sub);
  req.activeUser = user;
  next();
}, handleInvalidToken);

export default protectedRoute;
