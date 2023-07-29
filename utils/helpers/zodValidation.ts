export const setValueAsNumber = (v: string) =>
  v === "" ? undefined : parseInt(v, 10);
