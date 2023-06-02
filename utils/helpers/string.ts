export const capitalize = (str: string) => {
  if (!str) return str;
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
};
