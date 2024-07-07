import { login, register } from './user/auth';
import { deleteUser, softDeleteUser } from './user/delete';
import { count, findAll, findByEmail, findById, findByRole } from './user/find';
import { activateUser, deactivateUser, updateUserInfo, updateUserRole } from './user/update';

const userService = {
  login,
  register,
  findAll,
  findById,
  findByEmail,
  findByRole,
  updateUserInfo,
  updateUserRole,
  activateUser,
  deactivateUser,
  softDeleteUser,
  deleteUser,
  count,
};

export default userService;
