import { User } from '@prisma/client';

import { getRoleNames } from '@lib/utils/dto';

import userRepository from '@dto/user.repository';

type InfoPayload = Pick<Partial<User>, 'firstName' | 'lastName' | 'password'>;
type RolePayload = { roles?: string[]; removeRoles?: string[] };

export async function updateUserInfo(id: string, payload: InfoPayload) {
  const updatedUser = await userRepository.updateById(id, {
    ...payload,
    logType: 'update',
    logMessage: 'Successfully updated user info',
  });

  return { ...updatedUser, roles: getRoleNames(updatedUser.roles) };
}

export async function updateUserRole(id: string, payload: RolePayload) {
  const updatedUser = await userRepository.updateById(id, {
    ...payload,
    logType: 'update',
    logMessage: 'Successfully updated user roles',
  });

  return { ...updatedUser, roles: getRoleNames(updatedUser.roles) };
}

export async function activateUser(id: string) {
  const updatedUser = await userRepository.updateById(id, {
    active: true,
    deletedAt: null,
    logType: 'update',
    logMessage: 'Activated user',
  });

  return { ...updatedUser, roles: getRoleNames(updatedUser.roles) };
}

export async function deactivateUser(id: string) {
  const updatedUser = await userRepository.updateById(id, {
    active: false,
    logType: 'update',
    logMessage: 'Deactivated user',
  });

  return { ...updatedUser, roles: getRoleNames(updatedUser.roles) };
}
