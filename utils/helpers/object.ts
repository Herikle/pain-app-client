export const CleanUpUndefined = <T>(obj: any) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  });

  return newObj as T;
};

export const remove_id = <T = any>(obj: T) => {
  if (!obj) {
    return obj;
  }

  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (key !== "_id") {
      newObj[key] = obj[key];
    }
  });

  return newObj as T;
};

export const remove_idFromArrayOfObjects = <T = any>(arr: T[]) => {
  return arr.map((obj) => remove_id(obj));
};
