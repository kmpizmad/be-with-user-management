import { Dictionary } from '../../../lib/interfaces';
import { UserWithRole } from '../../../lib/interfaces/dto';
import createController from '../../../lib/server/createController';
import userService from '../../../services/user.service';

const getOne = createController<{ user: UserWithRole }, Dictionary, { id: string }>(async (req, res) => {
  const user = await userService.findById(req.params.id);

  res.status(200).json({ status: 200, message: 'Successfully fetched user', data: { user } });
});

export default getOne;
