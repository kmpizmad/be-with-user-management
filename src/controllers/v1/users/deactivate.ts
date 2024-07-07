import { createController } from '@lib/server';
import { Dictionary, UserWithRole } from '@lib/interfaces';
import userService from '@services/user.service';

const deactivate = createController<{ user: UserWithRole }, Dictionary, { id: string }>(async (req, res) => {
  const user = await userService.deactivateUser(req.params.id);

  res.status(200).json({ status: 200, message: 'Deactivated user', data: { user } });
});

export default deactivate;
