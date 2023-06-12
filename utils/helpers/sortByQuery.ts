export const SORT_BY_KEY = "sortBy";

export const valueIsDesc = (value: string) => {
  return value.startsWith("-");
};

export const toggleAscDescSortByValue = (value: string | null) => {
  if (!value) {
    return value;
  }
  return valueIsDesc(value) ? value.replace("-", "") : `-${value}`;
};

export const getPureSortValue = (value: string) => {
  return value.replace("-", "");
};
