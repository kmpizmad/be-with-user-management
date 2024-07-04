import { login, register } from './user/user-auth';
import { activateUser, deactivateUser, updateLastLogin, updateUser } from './user/update-user';
import { deleteUser, softDeleteUser } from './user/delete-user';

const userService = {
  login,
  register,
  updateUser,
  updateLastLogin,
  activateUser,
  deactivateUser,
  softDeleteUser,
  deleteUser,
};

export default userService;
