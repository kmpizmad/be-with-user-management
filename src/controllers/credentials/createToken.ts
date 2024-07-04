import * as jwt from 'jsonwebtoken';
import { Dictionary } from '../../lib/interfaces';
import createController from '../../lib/server/createController';
import config from '../../config';

const createToken = createController<Dictionary, { userId: string }, { accessToken: string }>((req, res) => {
  const accessToken = jwt.sign({}, config.ACCESS_TOKEN_SECRET, { subject: req.body.userId, expiresIn: '5m' });
  const refreshToken = jwt.sign({}, config.REFRESH_TOKEN_SECRET, { subject: req.body.userId, expiresIn: '7d' });

  res.cookie('refreshToken', refreshToken, config.COOKIE_OPTIONS);
  res.status(201).json({ status: 201, message: 'Created access token', data: { accessToken } });
});

export default createToken;
