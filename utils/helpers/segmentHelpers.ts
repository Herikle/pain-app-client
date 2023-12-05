import { ISegment, ISegmentTimeUnit, ISegmentValues } from "types";

export const getTimeUnitAbbreviation = (timeUnit?: ISegmentTimeUnit) => {
  if (!timeUnit) return "";

  const dict: { [key in ISegmentTimeUnit]: string } = {
    days: "d",
    hours: "hr",
    minutes: "m",
  };

  return dict[timeUnit];
};

export const convertTimeToHours = (
  time: number | undefined,
  timeUnit: ISegmentTimeUnit
) => {
  if (!time) return 0;

  if (timeUnit === "hours") return time;
  if (timeUnit === "days") return time * 24;
  if (timeUnit === "minutes") return time / 60;
  return time;
};

export type PainType =
  | "excruciating"
  | "disabling"
  | "hurful"
  | "annoying"
  | "no_pain";

const getCumulativeValue = (
  values: ISegmentValues,
  value: PainType,
  segmentTime: {
    min: number | undefined;
    max: number | undefined;
  },
  timeUnit: ISegmentTimeUnit
) => {
  const percentValue = values?.[value] ?? 0;

  if (percentValue === 0)
    return {
      min: 0,
      max: 0,
    };

  const min = convertTimeToHours(segmentTime.min, timeUnit);
  const max = convertTimeToHours(segmentTime.max, timeUnit);
  if (min === 0 && max === 0)
    return {
      min: 0,
      max: 0,
    };
  const percentage = percentValue / 100;
  const duration_min = min * percentage;
  const duration_max = max * percentage;
  return {
    min: duration_min,
    max: duration_max,
  };
};

export const convertNumberToFixed = (value: number) => {
  const number = value.toFixed(1);

  if (number === "0.0") return "0";

  return number;
};

export const calculateCumulativeTime = (segments: ISegment[] | undefined) => {
  if (!segments)
    return {
      e: "",
      d: "",
      h: "",
      a: "",
      n: "",
    };

  const excrutiating_durations = {
    min: 0,
    max: 0,
  };

  const disabling_durations = {
    min: 0,
    max: 0,
  };

  const hurful_durations = {
    min: 0,
    max: 0,
  };

  const annoying_durations = {
    min: 0,
    max: 0,
  };

  const no_pain_durations = {
    min: 0,
    max: 0,
  };

  for (const segment of segments) {
    const segmentTime = {
      min: segment.start,
      max: segment.end,
    };
    if (segment.intensities.values) {
      const segmentDuration = getCumulativeValue(
        segment.intensities.values,
        "excruciating",
        segmentTime,
        segment.time_unit
      );

      excrutiating_durations.min += segmentDuration.min;
      excrutiating_durations.max += segmentDuration.max;

      const disablingDuration = getCumulativeValue(
        segment.intensities.values,
        "disabling",
        segmentTime,
        segment.time_unit
      );

      disabling_durations.min += disablingDuration.min;
      disabling_durations.max += disablingDuration.max;

      const hurfulDuration = getCumulativeValue(
        segment.intensities.values,
        "hurful",
        segmentTime,
        segment.time_unit
      );

      hurful_durations.min += hurfulDuration.min;
      hurful_durations.max += hurfulDuration.max;

      const annoyingDuration = getCumulativeValue(
        segment.intensities.values,
        "annoying",
        segmentTime,
        segment.time_unit
      );

      annoying_durations.min += annoyingDuration.min;
      annoying_durations.max += annoyingDuration.max;

      const noPainDuration = getCumulativeValue(
        segment.intensities.values,
        "no_pain",
        segmentTime,
        segment.time_unit
      );

      no_pain_durations.min += noPainDuration.min;
      no_pain_durations.max += noPainDuration.max;
    }
  }

  return {
    e: `${convertNumberToFixed(
      excrutiating_durations.min
    )} - ${convertNumberToFixed(
      excrutiating_durations.max
    )} ${getTimeUnitAbbreviation("hours")}`,
    d: `${convertNumberToFixed(
      disabling_durations.min
    )} - ${convertNumberToFixed(
      disabling_durations.max
    )} ${getTimeUnitAbbreviation("hours")}`,
    h: `${convertNumberToFixed(hurful_durations.min)} - ${convertNumberToFixed(
      hurful_durations.max
    )} ${getTimeUnitAbbreviation("hours")}`,
    a: `${convertNumberToFixed(
      annoying_durations.min
    )} - ${convertNumberToFixed(
      annoying_durations.max
    )} ${getTimeUnitAbbreviation("hours")}`,
    n: `${convertNumberToFixed(no_pain_durations.min)} - ${convertNumberToFixed(
      no_pain_durations.max
    )} ${getTimeUnitAbbreviation("hours")}`,
  };
};
