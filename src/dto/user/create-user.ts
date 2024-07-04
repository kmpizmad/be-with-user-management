import { User } from '@prisma/client';
import { prisma } from '../../clients';
import { hashAuthKey } from '../../lib/utils/dto';

type CreateUser = Pick<User, 'provider' | 'authKey' | 'appId'> & { active?: boolean; role: string };

export async function create(payload: CreateUser) {
  const { appId, role, provider, authKey, ...rest } = payload;
  let pass = authKey;

  if (provider === 'local' && !!authKey) {
    pass = await hashAuthKey(authKey);
  }

  return await prisma.user.create({
    data: {
      ...rest,
      provider,
      authKey: pass,
      roles: {
        connectOrCreate: {
          create: { role },
          where: { role },
        },
      },
      app: {
        connect: { id: appId },
      },
    },
  });
}
