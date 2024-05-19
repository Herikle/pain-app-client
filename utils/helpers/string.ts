export const capitalize = (str: string | undefined) => {
  if (!str) return "";
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
};

export const textElipsis = (str: string, length: number) => {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
};

export const normalizeString = (value: string | undefined) => {
  if (!value) {
    return "";
  }

  return value;
};
