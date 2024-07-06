import activate from './activate';
import deactivate from './deactivate';
import deleteOne from './deleteOne';
import getAll from './getAll';
import getOne from './getOne';
import updateInfo from './updateInfo';
import updateRole from './updateRole';

const users = {
  getAll,
  getOne,
  updateInfo,
  updateRole,
  deleteOne,
  activate,
  deactivate,
};

export default users;
