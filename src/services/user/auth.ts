import { compare } from 'bcrypt';

import { UserLoginSchema, UserRegisterSchema } from '@lib/schemas/user';
import { getRoleNames, hashPassword } from '@lib/utils/dto';

import userRepository from '@dto/user.repository';

export async function login(payload: UserLoginSchema) {
  let user = await userRepository.findByEmail(payload.email);

  if (!(await compare(payload.password, user.password))) {
    throw new Error('Invalid login credentials');
  }

  user = await userRepository.updateById(user.id, {
    lastLogin: new Date(),
    logType: 'login',
    logMessage: 'User logged in',
  });

  return { ...user, roles: getRoleNames(user.roles) };
}

export async function register(payload: UserRegisterSchema) {
  const password = await hashPassword(payload.password);

  const user = await userRepository.create({
    ...payload,
    password,
    logMessage: 'User account created',
    logType: 'create',
  });

  return { ...user, roles: getRoleNames(user.roles) };
}
