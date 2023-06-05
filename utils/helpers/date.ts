import { differenceInYears } from "date-fns";

export const getAgeByBirthDate = (date: string) => {
  const today = new Date();

  return differenceInYears(today, new Date(date));
};
