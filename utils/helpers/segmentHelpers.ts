import { ISegmentTimeUnit } from "types";

export const getTimeUnitAbbreviation = (timeUnit?: ISegmentTimeUnit) => {
  if (!timeUnit) return "";

  const dict: { [key in ISegmentTimeUnit]: string } = {
    days: "d",
    hours: "h",
    minutes: "m",
  };

  return dict[timeUnit];
};
