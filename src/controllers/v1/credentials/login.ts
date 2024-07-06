import createController from '../../../lib/server/createController';
import userService from '../../../services/user.service';
import { UserLoginSchema } from '../../../lib/schemas/user';
import { UserWithRole } from '../../../lib/interfaces/dto';
import config from '../../../config';
import tokenService from '../../../services/token.service';

const login = createController<{ user: UserWithRole; accessToken: string }, UserLoginSchema>(async (req, res) => {
  const user = await userService.login(req.body);

  const accessToken = tokenService.createToken('access', { subject: user.id });
  const refreshToken = tokenService.createToken('refresh', { subject: user.id });

  res.cookie('refreshToken', refreshToken, config.COOKIE_OPTIONS);
  res.status(200).json({ status: 200, message: 'Successful login', data: { user, accessToken } });
});

export default login;
