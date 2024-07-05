import { User } from '@prisma/client';
import { prisma } from '../../clients';
import { UserHistory } from '../../lib/interfaces/dto';

type UpdateUser = Omit<Partial<User>, 'id' | 'email' | 'createdAt' | 'updatedAt'> & UserHistory;

export async function updateById(id: string, payload: UpdateUser) {
  const { logMessage, logType, ...rest } = payload;

  return await prisma.user.update({
    where: { id },
    data: {
      ...rest,
      history: {
        create: {
          message: logMessage,
          type: {
            connectOrCreate: {
              create: { type: logType },
              where: { type: logType },
            },
          },
        },
      },
    },
    include: { roles: true },
  });
}
