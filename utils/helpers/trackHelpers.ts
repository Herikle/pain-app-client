import { ISegment, ITrack } from "types";

const segmentHaveTime = (segment: { start?: number; end?: number }) => {
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
};

const segmentHaveIntensities = (segment: ISegment) => {
  const values = segment.intensities.values;

  if (!values) return false;

  const someValueHaveTime = Object.keys(values).some((key) => {
    return values[key] > 0;
  });

  if (!someValueHaveTime) return false;

  return true;
};

export const checkIfTrackHasEnoughData = (track: ITrack) => {
  const segments = track.segments;

  if (!segments) return false;

  const allSegmentsHaveTime = segments.every((segment) => {
    const doNotHaveTimeAndIntensities =
      !segmentHaveTime(segment) && !segmentHaveIntensities(segment);

    if (doNotHaveTimeAndIntensities) return true;

    return segmentHaveTime(segment);
  });

  if (!allSegmentsHaveTime) return false;

  const allSegmentsHaveIntensities = segments.every((segment) => {
    const doNotHaveTimeAndIntensities =
      !segmentHaveTime(segment) && !segmentHaveIntensities(segment);

    if (doNotHaveTimeAndIntensities) return true;

    return segmentHaveIntensities(segment);
  });

  if (!allSegmentsHaveIntensities) return false;

  const someSegmentsHaveTimeAndIntensities = segments.some((segment) => {
    const haveTimeAndIntensities =
      segmentHaveTime(segment) && segmentHaveIntensities(segment);

    if (haveTimeAndIntensities) return true;

    return false;
  });

  if (!someSegmentsHaveTimeAndIntensities) return false;

  return true;
};
