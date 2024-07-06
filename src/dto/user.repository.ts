import { count, findAll, findByEmail, findById, findByRole } from './user/find';
import { create } from './user/create';
import { updateById } from './user/update';
import { deleteById } from './user/delete';

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
