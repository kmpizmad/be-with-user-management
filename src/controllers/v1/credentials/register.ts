import { createController } from '@lib/server';
import { UserWithRole } from '@lib/interfaces';
import { UserRegisterSchema } from '@lib/schemas/user';
import userService from '@services/user.service';

const register = createController<{ user: UserWithRole }, UserRegisterSchema>(async (req, res) => {
  const user = await userService.register(req.body);

  res.status(201).json({ status: 201, message: 'Created new user', data: { user } });
});

export default register;
