import { prisma } from '@clients';

export async function deleteById(id: string, type: 'soft' | 'hard') {
  if (type === 'soft') {
    return await prisma.user.update({
      where: { id },
      data: {
        active: false,
        deletedAt: new Date(),
      },
    });
  }

  return await prisma.user.delete({ where: { id } });
}
