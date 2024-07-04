import { genSalt, hash } from 'bcrypt';
import { objectMapper } from './object-fns';

export function includeMapper(arr: string[] = []) {
  if (arr.length === 0) return null;

  return objectMapper(arr, key => ({ [key]: true }));
}

export async function hashAuthKey(authKey: string | null = '') {
  if (!authKey) return null;

  const salt = await genSalt();
  const pass = await hash(authKey, salt);

  return pass;
}
