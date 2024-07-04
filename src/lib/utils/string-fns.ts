export function isUppercaseLetter(str: string): boolean {
  return str.length === 1 && /[A-Z]/.test(str);
}

export function isLowercaseLetter(str: string): boolean {
  return str.length === 1 && /[a-z]/.test(str);
}

export function isNumberCharacter(str: string): boolean {
  return str.length === 1 && /[0-9]/.test(str);
}

export function isSpecialCharacter(str: string): boolean {
  const isSpecial = /[^\w\s]/.test(str);
  const isUnderscore = str === '_';
  return str.length === 1 && (isSpecial || isUnderscore);
}

export function countLetterByPredicate(str: string, predicate: (str: string) => boolean): number {
  let count: number = 0;
  for (let i: number = 0; i < str.length; i++) {
    if (predicate(str[i])) count += 1;
  }
  return count;
}
