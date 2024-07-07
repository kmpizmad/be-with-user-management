import { Role } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

export function getRoleNames(roles: Role[]): string[] {
  return roles.reduce((prev, curr) => [...prev, curr.role], [] as string[]);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt();
  const pass = await hash(password, salt);

  return pass;
}
