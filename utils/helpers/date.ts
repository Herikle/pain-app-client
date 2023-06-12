import { differenceInYears } from "date-fns";

export const getAgeByBirthDate = (date: string) => {
  const today = new Date();

  return differenceInYears(today, new Date(date));
};

export const getOnlyDateFromIsoDate = (date: string | undefined) => {
  if (!date) {
    return "";
  }
  const dateObject = new Date(date);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  const monthString = month < 10 ? `0${month}` : `${month}`;
  const dayString = day < 10 ? `0${day}` : `${day}`;

  return `${year}-${monthString}-${dayString}`;
};
