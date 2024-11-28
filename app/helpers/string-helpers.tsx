export const capitalize = (str: string) => {
  str = str.toLocaleLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}