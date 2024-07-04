import { User } from '@prisma/client';
import { prisma } from '../../clients';
import { hashAuthKey } from '../../lib/utils/dto';

type UpdateUser = Pick<Partial<User>, 'authKey' | 'active' | 'lastLogin'>;

export async function updateById(id: string, payload: UpdateUser) {
  const { authKey, ...rest } = payload;

  return await prisma.user.update({
    where: { id },
    data: {
      ...rest,
      authKey: await hashAuthKey(authKey),
    },
  });
}
