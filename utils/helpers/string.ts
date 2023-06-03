export const capitalize = (str: string | undefined) => {
  if (!str) return str;
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
};
