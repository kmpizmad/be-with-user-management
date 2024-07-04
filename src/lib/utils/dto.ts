import { genSalt, hash } from 'bcrypt';
import { mapObject } from './object-fns';

export function includeMapper(arr: string[] = []) {
  if (arr.length === 0) return null;

  return mapObject(arr, key => ({ [key]: true }));
}

export async function hashPassword(password: string) {
  const salt = await genSalt();
  const pass = await hash(password, salt);

  return pass;
}
