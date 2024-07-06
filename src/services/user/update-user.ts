import { User } from '@prisma/client';
import userRepository from '../../dto/user.repository';
import { getRoleNames } from '../../lib/utils/dto';

type Payload = Pick<Partial<User>, 'firstName' | 'lastName' | 'password'>;

export async function updateUser(id: string, payload: Payload) {
  const user = await userRepository.updateById(id, {
    ...payload,
    logType: 'update',
    logMessage: 'Successfully updated user info',
  });

  return { ...user, roles: getRoleNames(user.roles) };
}

export async function activateUser(id: string) {
  const user = await userRepository.updateById(id, {
    active: true,
    logType: 'update',
    logMessage: 'Activated user',
  });

  return { ...user, roles: getRoleNames(user.roles) };
}

export async function deactivateUser(id: string) {
  const user = await userRepository.updateById(id, {
    active: false,
    logType: 'update',
    logMessage: 'Deactivated user',
  });

  return { ...user, roles: getRoleNames(user.roles) };
}
