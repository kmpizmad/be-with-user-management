import { prisma } from '../../clients';
import { DtoFindMany } from '../../lib/interfaces/dto';

export async function findAll(args?: DtoFindMany<typeof prisma.user.findMany>) {
  return await prisma.user.findMany({
    ...args,
    include: {
      roles: true,
      history: {
        include: {
          type: true,
        },
      },
    },
  });
}

export async function findById(id: string) {
  return await prisma.user.findUniqueOrThrow({
    where: { id },
    include: {
      roles: true,
      history: {
        include: {
          type: true,
        },
      },
    },
  });
}

export async function findByEmail(email: string) {
  return await prisma.user.findUniqueOrThrow({
    where: { email },
    include: {
      roles: true,
      history: {
        include: {
          type: true,
        },
      },
    },
  });
}

export async function findByRole(role: string, args?: DtoFindMany<typeof prisma.user.findMany>) {
  return await prisma.user.findMany({
    ...args,
    where: {
      roles: { some: { role } },
    },
    include: {
      roles: true,
      history: {
        include: {
          type: true,
        },
      },
    },
  });
}
