import { Dictionary, UserWithRole } from '@lib/interfaces';
import { createController } from '@lib/server';

import userService from '@services/user.service';

const activate = createController<{ user: UserWithRole }, Dictionary, { id: string }>(async (req, res) => {
  const user = await userService.activateUser(req.params.id);

  res.status(200).json({ status: 200, message: 'Activated user', data: { user } });
});

export default activate;
