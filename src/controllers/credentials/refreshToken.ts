import * as jwt from 'jsonwebtoken';
import { Dictionary } from '../../lib/interfaces';
import createController from '../../lib/server/createController';
import config from '../../config';
import { handleInvalidToken } from '../../lib/error-handlers/token';

type Token = jwt.JwtPayload;

const refreshToken = createController<Dictionary, Dictionary, { accessToken: string }>((req, res) => {
  const decodedToken = jwt.verify(req.cookies.refreshToken, config.REFRESH_TOKEN_SECRET) as Token;
  const accessToken = jwt.sign({}, config.ACCESS_TOKEN_SECRET, {
    subject: decodedToken.sub,
    expiresIn: config.ACCESS_TOKEN_TTL,
  });
  const refreshToken = jwt.sign({}, config.REFRESH_TOKEN_SECRET, {
    subject: decodedToken.sub,
    expiresIn: config.REFRESH_TOKEN_TTL,
  });

  res.cookie('refreshToken', refreshToken, config.COOKIE_OPTIONS);
  res.status(201).json({ status: 201, message: 'Refreshed access token', data: { accessToken } });
}, handleInvalidToken);

export default refreshToken;
