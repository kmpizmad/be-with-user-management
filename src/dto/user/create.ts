import { UserHistory } from '@lib/interfaces';
import { UserRegisterSchema } from '@lib/schemas/user';

import { prisma } from '@clients';

type Payload = UserRegisterSchema & UserHistory;

export async function create(payload: Payload) {
  const { roles, logMessage, logType, ...rest } = payload;

  return await prisma.user.create({
    data: {
      ...rest,
      roles: {
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
