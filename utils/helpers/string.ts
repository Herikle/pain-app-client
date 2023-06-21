export const capitalize = (str: string | undefined) => {
  if (!str) return str;
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
};

export const textElipsis = (str: string, length: number) => {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
};
