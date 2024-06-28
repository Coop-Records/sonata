export function replaceSpecialCharacters(str: any) {
  const specialChars = /[^a-zA-Z0-9]/g;
  return str.replace(specialChars, '_');
}
