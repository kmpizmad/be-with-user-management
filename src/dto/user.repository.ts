import { create } from './user/create';
import { deleteById } from './user/delete';
import { count, findAll, findByEmail, findById, findByRole } from './user/find';
import { updateById } from './user/update';

const userRepository = {
  findAll,
  findById,
  findByEmail,
  findByRole,
  create,
  updateById,
  deleteById,
  count,
};

export default userRepository;
