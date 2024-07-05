import { login, register } from './user/user-auth';
import { findAll, findByEmail, findById, findByRole } from './user/find-user';
import { activateUser, deactivateUser, updateLastLogin, updateUser } from './user/update-user';
import { deleteUser, softDeleteUser } from './user/delete-user';

const userService = {
  login,
  register,
  findAll,
  findById,
  findByEmail,
  findByRole,
  updateUser,
  updateLastLogin,
  activateUser,
  deactivateUser,
  softDeleteUser,
  deleteUser,
};

export default userService;
