import { differenceInYears, format } from "date-fns";

export const getAgeByBirthDate = (date: string) => {
  const today = new Date();

  return differenceInYears(today, new Date(date));
};

export const getOnlyDateFromIsoDate = (date: string | undefined) => {
  if (!date) {
    return "";
  }

  return format(new Date(date), "yyyy-MM-dd");
};

export const getDotDateFormat = (date: string | undefined) => {
  if (!date) {
    return "";
  }

  return format(new Date(date), "dd.MM.yy");
};
