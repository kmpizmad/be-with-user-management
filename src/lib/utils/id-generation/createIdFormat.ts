export default function createIdFormat(length: number, options: CreateFormatOptions): string {
  const template: string[] = new Array<string>(length).fill('x');
  const positions: number[] = options.delimiterPositions.sort((a, b) => a - b).filter(x => x > 0 && x < length - 1);

  let k: number = 0;
  let format: string = '';

  for (let i: number = 0; i < template.length; i++) {
    if (i === positions[k]) {
      format += options.delimiter;
      k++;
    }

    format += template[i];
  }

  return format;
}

type CreateFormatOptions = {
  delimiter: string;
  delimiterPositions: number[];
};
