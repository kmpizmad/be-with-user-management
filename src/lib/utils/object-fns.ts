import { Prettify } from '../interfaces';

export function createObjectFromArray(arr: unknown[]): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    obj[`#${i + 1}`] = typeof current === 'string' ? current.trim() : current;
  }
  return obj;
}

export function objectMapper(arr: string[], setter: (key: string) => Record<string, unknown>) {
  const map = arr.map(item => setter(item));
  const obj = map.reduce((prev, curr) => ({ ...prev, ...curr }), {});

  return obj;
}

export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  ...params: K[]
): Prettify<Omit<T, K>> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (params.includes(key as K)) continue;
    result[key] = value;
  }

  return result as Omit<T, K>;
}
