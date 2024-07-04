import { prisma } from '../../clients';
import { includeMapper } from '../../lib/utils/dto';
import { DtoFindMany } from '../../lib/interfaces/dto';

export async function findAll(args?: DtoFindMany<typeof prisma.user.findMany>) {
  return await prisma.user.findMany({
    ...args,
    include: includeMapper(args?.include),
  });
}

export async function findById(id: string) {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id },
    include: {
      roles: {
        select: { role: true },
      },
    },
  });

  return { ...user, roles: user.roles.map(x => x.role) };
}

export async function findByRole(role: string, args?: DtoFindMany<typeof prisma.user.findMany>) {
  const users = await prisma.user.findMany({
    ...args,
    where: {
      roles: { every: { role } },
    },
    include: {
      roles: {
        select: { role: true },
      },
    },
  });

  return users.map(user => ({ ...user, roles: user.roles.map(x => x.role) }));
}
