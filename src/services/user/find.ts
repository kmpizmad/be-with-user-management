import { FindManyUserArgs, UserWithRole } from '@lib/interfaces';
import { getRoleNames } from '@lib/utils/dto';

import userRepository from '@dto/user.repository';

export async function findAll(args?: FindManyUserArgs): Promise<UserWithRole[]> {
  const users = await userRepository.findAll(args);

  return users.map(user => ({ ...user, roles: getRoleNames(user.roles) }));
}

export async function findById(id: string): Promise<UserWithRole> {
  const user = await userRepository.findById(id);

  return { ...user, roles: getRoleNames(user.roles) };
}

export async function findByEmail(email: string): Promise<UserWithRole> {
  const user = await userRepository.findByEmail(email);

  return { ...user, roles: getRoleNames(user.roles) };
}

export async function findByRole(role: string, args?: FindManyUserArgs): Promise<UserWithRole[]> {
  const users = await userRepository.findByRole(role, args);

  return users.map(user => ({ ...user, roles: getRoleNames(user.roles) }));
}

export async function count(): Promise<number> {
  const numberOfUsers = await userRepository.count();

  return numberOfUsers;
}
