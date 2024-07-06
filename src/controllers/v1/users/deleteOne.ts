import { User } from '@prisma/client';
import { UserDeleteSchema } from '../../../lib/schemas/user';
import createController from '../../../lib/server/createController';
import userService from '../../../services/user.service';

const deleteOne = createController<{ user: User }, UserDeleteSchema, { id: string }>(async (req, res) => {
  const userId = req.params.id;
  let user: User;

  if (req.body.type === 'soft') {
    user = await userService.softDeleteUser(userId);
  } else {
    user = await userService.deleteUser(userId);
  }

  res.status(200).json({ status: 200, message: 'Successfully deleted user', data: { user } });
});

export default deleteOne;
