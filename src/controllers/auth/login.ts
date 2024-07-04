import createController from '../../lib/server/createController';
import userService from '../../services/user.service';
import { User } from '@prisma/client';
import { UserLoginSchema } from '../../lib/schemas/user';

type LoggedInUser = User & { roles: string[] };

const login = createController<{ user: LoggedInUser }, UserLoginSchema>(async (req, res) => {
  const user = await userService.login(req.body);

  res.status(200).json({ status: 200, message: 'Successful login', data: { user } });
});

export default login;
