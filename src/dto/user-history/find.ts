import { FindManyUserHistoryArgs } from '@lib/interfaces';

import { prisma } from '@clients';

export async function findByUserId(id: string, args?: FindManyUserHistoryArgs) {
  return await prisma.userHistory.findMany({
    ...args,
    where: { userId: id },
    select: {
      id: true,
      type: {
        select: { type: true },
      },
      message: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
