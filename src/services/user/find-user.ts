import userRepository from '../../dto/user.repository';

export async function findAll(args?: Parameters<typeof userRepository.findAll>[0]) {
  const users = await userRepository.findAll(args);
}

export async function findById(id: string) {
  const user = await userRepository.findById(id);
}

export async function findByEmail(email: string) {
  const user = await userRepository.findByEmail(email);
}

export async function findByRole(role: string, args?: Parameters<typeof userRepository.findByRole>[1]) {
  const users = await userRepository.findByRole(role, args);
}
