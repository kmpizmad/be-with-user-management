import { prisma } from '../../clients';
import { FindManyUserArgs } from '../../lib/interfaces/dto';

export async function findAll(args?: FindManyUserArgs) {
  return await prisma.user.findMany({
    ...args,
    include: { roles: true },
  });
}

export async function findById(id: string) {
  return await prisma.user.findUniqueOrThrow({
    where: { id },
    include: { roles: true },
  });
}

export async function findByEmail(email: string) {
  return await prisma.user.findUniqueOrThrow({
    where: { email },
    include: { roles: true },
  });
}

export async function findByRole(role: string, args?: FindManyUserArgs) {
  return await prisma.user.findMany({
    ...args,
    where: {
      roles: { some: { role } },
    },
    include: { roles: true },
  });
}

export async function count() {
  return await prisma.user.count();
}
