import { ISegment } from "types";
import { SegmentPageForm } from "../../SegmentPage";
import { useCallback, useState } from "react";
import _ from "lodash";
import {
  getDateAndTimeFromIsoDate,
  getDateFromString,
} from "@utils/helpers/date";
import { normalizeString } from "@utils/helpers/string";

export const useSegmentPageForm = (segment: ISegment) => {
  const [segmentPageForm, setSegmentPageForm] = useState<SegmentPageForm>({
    name: normalizeString(segment.name),
    start: segment.start ?? 0,
    end: segment.end ?? 0,
    estimative_type: segment.estimative_type,
    pain_type: segment.pain_type,
    start_date: getDateFromString(segment.start_date),
    time_unit: segment.time_unit,
    comment: normalizeString(segment.comment),
  });
  const [segmentPageFormIsValid, setSegmentPageFormIsValid] = useState(true);

  const onChangeSsegmentPageForm = useCallback((data: SegmentPageForm) => {
    setSegmentPageForm(data);
  }, []);

  const isDirtySegmentPageForm = () => {
    const segmentValues = {
      name: normalizeString(segment.name),
      start: segment.start ?? 0,
      end: segment.end ?? 0,
      estimative_type: segment.estimative_type,
      pain_type: segment.pain_type,
      start_date: getDateAndTimeFromIsoDate(segment.start_date),
      time_unit: segment.time_unit,
      comment: normalizeString(segment.comment),
    };

    const pageFormFixed = {
      ...segmentPageForm,
      start_date: getDateAndTimeFromIsoDate(segmentPageForm.start_date),
    };

    const isEqual = _.isEqual(pageFormFixed, segmentValues);

    return !isEqual;
  };

  return {
    segmentPageForm,
    segmentPageFormIsValid,
    onChangeSsegmentPageForm,
    setSegmentPageFormIsValid,
    isDirtySegmentPageForm,
  };
};
