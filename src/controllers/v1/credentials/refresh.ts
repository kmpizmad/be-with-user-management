import { createController } from '@lib/server';
import tokenService from '@services/token.service';
import config from '@config';
import { handleInvalidToken } from 'src/lib/error-handlers/token';

const refresh = createController<{ accessToken: string }, { accessToken: string }>((req, res) => {
  const decodedToken = tokenService.verify({
    userId: req.activeUser?.id,
    token: req.cookies.refreshToken,
    secret: config.REFRESH_TOKEN_SECRET,
  });

  const accessToken = tokenService.createToken('access', { subject: decodedToken.sub });
  const refreshToken = tokenService.createToken('refresh', { subject: decodedToken.sub });

  res.cookie('refreshToken', refreshToken, config.COOKIE_OPTIONS);
  res.status(201).json({ status: 201, message: 'Refreshed access token', data: { accessToken } });
}, handleInvalidToken);

export default refresh;