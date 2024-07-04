export const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
export const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const numberCharacters = '1234567890';
export const specialCharacters = '\'"+!%/=()~`,.-?:_;*<>#&@{}[]$';

export default function getCharset(
  charsetTypes: CharsetTypes = { lowercase: true, uppercase: true, numbers: true, specials: true },
): string {
  let charset: string = '';

  if (charsetTypes.lowercase) charset += lowercaseLetters;
  if (charsetTypes.uppercase) charset += uppercaseLetters;
  if (charsetTypes.numbers) charset += numberCharacters;
  if (charsetTypes.specials) charset += specialCharacters;

  return charset;
}

type CharsetTypes = {
  lowercase?: boolean;
  uppercase?: boolean;
  numbers?: boolean;
  specials?: boolean;
};
