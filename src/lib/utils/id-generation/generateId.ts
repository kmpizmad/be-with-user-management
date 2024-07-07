import { Prettify } from '@lib/interfaces';

import getCharset from './getCharset';

export default function generateId(options?: Options): string {
  let lookup: string = getCharset();

  if (options?.charset) {
    lookup = options.charset;
  }

  const defaultLength: number = 16;
  const length: number = options?.length || defaultLength;

  if (options?.format) {
    return generateIdByFormat(options.format, { charset: lookup });
  }

  return generateIdByLength(length, { charset: lookup });
}

function generateIdByLength(length: number, options: GenerateOptions): string {
  let id: string = '';

  for (let i: number = 0; i < length; i++) {
    const rnd: number = Math.floor(Math.random() * options.charset.length);
    const newCharacter: string = options.charset[rnd] as string;
    id += newCharacter;
  }

  return id;
}

function generateIdByFormat(format: string, options: GenerateOptions): string {
  const _delimiter: string = format.split('').find(x => x.toLowerCase() !== 'x') || '';
  const _charset: string[] = options.charset.split('').filter(x => x !== _delimiter);
  const _format: string[] = format.split(_delimiter);
  const length: number = _format.join('').length;

  let id: string = '';
  let section: number = 0;
  let sectionIter: number = 0;

  for (let i: number = 0; i < length; i++) {
    const rnd: number = Math.floor(Math.random() * _charset.length);
    const newCharacter: string = _charset[rnd] as string;
    id += newCharacter;

    sectionIter += 1;
    const sectionLength: number = (_format[section] as string).length;

    if (sectionLength / sectionIter === 1 && i < length - 1) {
      id += _delimiter;
      section += 1;
      sectionIter = 0;
    }
  }

  return id;
}

type Options = Prettify<LengthOptions | FormatOptions>;
type LengthOptions = { format?: never; length: number } & CharsetOptions;
type FormatOptions = { format: string; length?: never } & CharsetOptions;
type CharsetOptions = { charset?: string };
type GenerateOptions = { charset: string };
