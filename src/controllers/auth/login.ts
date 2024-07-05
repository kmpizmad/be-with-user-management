import createController from '../../lib/server/createController';
import userService from '../../services/user.service';
import { UserLoginSchema } from '../../lib/schemas/user';
import { UserWithRole } from '../../lib/interfaces/dto';

const login = createController<{ user: UserWithRole }, UserLoginSchema>(async (req, res) => {
  const user = await userService.login(req.body);

  res.status(200).json({ status: 200, message: 'Successful login', data: { user } });
});

export default login;
