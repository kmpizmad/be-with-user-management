import { prisma } from '../../clients';
import { UserRegisterSchema } from '../../lib/schemas/user';

type Payload = UserRegisterSchema & { logMessage: string; logType: string };

export async function create(payload: Payload) {
  const { role, logMessage, logType, ...rest } = payload;

  return await prisma.user.create({
    data: {
      ...rest,
      roles: {
        connectOrCreate: {
          create: { role },
          where: { role },
        },
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
    include: {
      roles: true,
      history: true,
    },
  });
}
