import { Prettify } from '../interfaces';

export function mapObject<T>(arr: T[], setter: (item: T, index: number) => Record<string, unknown>) {
  const map = arr.map((item, index) => setter(item, index));
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
