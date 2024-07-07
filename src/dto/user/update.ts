import { User } from '@prisma/client';

import { UserHistory } from '@lib/interfaces';

import { prisma } from '@clients';

type UpdateUser = Omit<Partial<User>, 'id' | 'email' | 'createdAt' | 'updatedAt'> &
  UserHistory & { roles?: string[]; removeRoles?: string[] };

export async function updateById(id: string, payload: UpdateUser) {
  const { logMessage, logType, roles = [], removeRoles = [], ...rest } = payload;

  return await prisma.user.update({
    where: { id },
    data: {
      ...rest,
      roles: {
        disconnect: removeRoles.map(role => ({ role })),
        connectOrCreate: roles.map(role => ({
          where: { role },
          create: { role },
        })),
      },
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
