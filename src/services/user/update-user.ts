import { User } from '@prisma/client';
import userRepository from '../../dto/user.repository';

type Payload = Pick<Partial<User>, 'firstName' | 'lastName' | 'password'>;

export async function updateUser(id: string, payload: Payload) {
  return await userRepository.updateById(id, payload);
}

export async function updateLastLogin(id: string) {
  return await userRepository.updateById(id, { lastLogin: new Date() });
}

export async function activateUser(id: string) {
  return await userRepository.updateById(id, { active: true });
}

export async function deactivateUser(id: string) {
  return await userRepository.updateById(id, { active: false });
}
