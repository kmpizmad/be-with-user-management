export function parseIntWithFallback(value: string | undefined): number | undefined;
export function parseIntWithFallback<T>(value: string | undefined, fallback: T): number | T;
export function parseIntWithFallback<T>(value: string | undefined, fallback?: T): number | undefined | T {
  if (!value) return undefined;

  const parsedValue = parseInt(value);

  if (isNaN(parsedValue)) return fallback || undefined;
  return parsedValue;
}

export function parseFloatWithFallback(value: string | undefined): number | undefined;
export function parseFloatWithFallback<T>(value: string | undefined, fallback: T): number | T;
export function parseFloatWithFallback<T>(value: string | undefined, fallback?: T): number | undefined | T {
  if (!value) return undefined;

  const parsedValue = parseFloat(value);

  if (isNaN(parsedValue)) return fallback || undefined;
  return parsedValue;
}

export function parseSearchParamForValidation(value: string | undefined): string | undefined {
  return value?.replaceAll('%20', ' ').trim();
}
