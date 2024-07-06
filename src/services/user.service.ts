import { login, register } from './user/auth';
import { count, findAll, findByEmail, findById, findByRole } from './user/find';
import { activateUser, deactivateUser, updateUserInfo, updateUserRole } from './user/update';
import { deleteUser, softDeleteUser } from './user/delete';

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
