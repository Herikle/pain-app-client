import { ITrack } from "types";

export const checkIfTrackHasEnoughData = (track: ITrack) => {
  const segments = track.segments;

  if (!segments) return false;

  const allSegmentsHaveTime = segments.every((segment) => {
    const bothAreUndefined =
      segment.start === undefined && segment.end === undefined;

    if (bothAreUndefined) return false;

    const bothAreZero = segment.start === 0 && segment.end === 0;

    if (bothAreZero) return false;

    const startIsUndefined = segment.start === undefined;

    if (startIsUndefined) return false;

    const endIsUndefined = segment.end === undefined;

    if (endIsUndefined) return false;

    return true;
  });

  if (!allSegmentsHaveTime) return false;

  const allSegmentsHaveIntensities = segments.every((segment) => {
    const values = segment.intensities.values;

    if (!values) return false;

    const someValueHaveTime = Object.keys(values).some((key) => {
      return values[key] > 0;
    });

    if (!someValueHaveTime) return false;

    return true;
  });

  if (!allSegmentsHaveIntensities) return false;

  return true;
};
