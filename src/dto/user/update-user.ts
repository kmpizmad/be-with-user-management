import { User } from '@prisma/client';
import { prisma } from '../../clients';

type UpdateUser = Omit<Partial<User>, 'id' | 'email' | 'createdAt' | 'updatedAt'>;

export async function updateById(id: string, payload: UpdateUser) {
  return await prisma.user.update({
    where: { id },
    data: payload,
  });
}
