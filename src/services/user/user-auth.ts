import { compare } from 'bcrypt';
import userRepository from '../../dto/user.repository';
import { UserLoginSchema, UserRegisterSchema } from '../../lib/schemas/user';
import { hashPassword } from '../../lib/utils/dto';

export async function login(payload: UserLoginSchema) {
  const user = await userRepository.findByEmail(payload.email);

  if (!(await compare(payload.password, user.password))) {
    throw new Error('Invalid login credentials');
  }

  return user;
}

export async function register(payload: UserRegisterSchema) {
  const password = await hashPassword(payload.password);

  return await userRepository.create({
    ...payload,
    password,
    logMessage: 'Successfully created user',
    logType: 'create',
  });
}
