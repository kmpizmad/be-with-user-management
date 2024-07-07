import userRepository from '@dto/user.repository';

export async function softDeleteUser(id: string) {
  return await userRepository.deleteById(id, 'soft');
}

export async function deleteUser(id: string) {
  return await userRepository.deleteById(id, 'hard');
}
