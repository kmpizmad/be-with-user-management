import * as jwt from 'jsonwebtoken';
import createController from '../../lib/server/createController';
import userService from '../../services/user.service';
import { UserLoginSchema } from '../../lib/schemas/user';
import { UserWithRole } from '../../lib/interfaces/dto';
import config from '../../config';

const login = createController<{ user: UserWithRole; accessToken: string }, UserLoginSchema>(async (req, res) => {
  const user = await userService.login(req.body);
  const accessToken = jwt.sign({}, config.ACCESS_TOKEN_SECRET, { subject: user.id, expiresIn: '5m' });
  const refreshToken = jwt.sign({}, config.REFRESH_TOKEN_SECRET, { subject: user.id, expiresIn: '7d' });

  res.cookie('refreshToken', refreshToken, config.COOKIE_OPTIONS);
  res.status(200).json({ status: 200, message: 'Successful login', data: { user, accessToken } });
});

export default login;
