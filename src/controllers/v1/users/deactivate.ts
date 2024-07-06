import createController from '../../../lib/server/createController';
import userService from '../../../services/user.service';
import { Dictionary } from '../../../lib/interfaces';
import { UserWithRole } from '../../../lib/interfaces/dto';

const deactivate = createController<{ user: UserWithRole }, Dictionary, { id: string }>(async (req, res) => {
  const user = await userService.deactivateUser(req.params.id);

  res.status(200).json({ status: 200, message: 'Deactivated user', data: { user } });
});

export default deactivate;
