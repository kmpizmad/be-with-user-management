import userService from '../../../services/user.service';
import createController from '../../../lib/server/createController';
import { UserWithRole } from '../../../lib/interfaces/dto';
import { UserRoleSchema } from '../../../lib/schemas/user';

const updateRole = createController<{ user: UserWithRole }, UserRoleSchema, { id: string }>(async (req, res) => {
  const userId = req.params.id;
  const payload = req.body;
  let user: UserWithRole;

  if (!payload.roles && !payload.removeRoles) {
    user = await userService.findById(userId);
    res.status(200).json({ status: 200, message: 'No operation needed', data: { user } });

    return;
  }

  user = await userService.updateUserRole(userId, req.body);

  res.status(200).json({ status: 200, message: 'Successfully updated user', data: { user } });
});

export default updateRole;
