import { UserWithRole } from '@lib/interfaces';
import { UserLoginSchema } from '@lib/schemas/user';
import { createController } from '@lib/server';

import tokenService from '@services/token.service';
import userService from '@services/user.service';

import config from '@config';

const login = createController<{ user: UserWithRole; accessToken: string }, UserLoginSchema>(async (req, res) => {
  const user = await userService.login(req.body);

  const accessToken = tokenService.createToken('access', { subject: user.id });
  const refreshToken = tokenService.createToken('refresh', { subject: user.id });

  res.cookie('refreshToken', refreshToken, config.COOKIE_OPTIONS);
  res.status(200).json({ status: 200, message: 'Successful login', data: { user, accessToken } });
});

export default login;
