import { UserWithRole } from '@lib/interfaces';
import { UserInfoSchema } from '@lib/schemas/user';
import { createController } from '@lib/server';

import userService from '@services/user.service';

const updateInfo = createController<{ user: UserWithRole }, UserInfoSchema, { id: string }>(async (req, res) => {
  let user: UserWithRole;

  if (Object.entries(req.body).length === 0) {
    user = await userService.findById(req.params.id);
    res.status(200).json({ status: 200, message: 'No operation needed', data: { user } });

    return;
  }

  user = await userService.updateUserInfo(req.params.id, req.body);

  res.status(200).json({ status: 200, message: 'Successfully updated user', data: { user } });
});

export default updateInfo;
