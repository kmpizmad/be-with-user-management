import { findAll, findByEmail, findById, findByRole } from './user/find-user';
import { create } from './user/create-user';
import { updateById } from './user/update-user';
import { deleteById } from './user/delete-user';

const userRepository = {
  findAll,
  findById,
  findByEmail,
  findByRole,
  create,
  updateById,
  deleteById,
};

export default userRepository;
