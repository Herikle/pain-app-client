import { ISegment } from "types";
import { SegmentPageForm } from "../../SegmentPage";
import { useCallback, useState } from "react";
import _ from "lodash";
import { getDateAndTimeFromIsoDate } from "@utils/helpers/date";
import { normalizeString } from "@utils/helpers/string";

export const useSegmentPageForm = (segment: ISegment) => {
  const [segmentPageForm, setSegmentPageForm] = useState<SegmentPageForm>({
    name: normalizeString(segment.name),
    start: segment.start,
    end: segment.end,
    estimative_type: segment.estimative_type,
    pain_type: segment.pain_type,
    start_date: getDateAndTimeFromIsoDate(segment.start_date),
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
      start: segment.start,
      end: segment.end,
      estimative_type: segment.estimative_type,
      pain_type: segment.pain_type,
      start_date: getDateAndTimeFromIsoDate(segment.start_date),
      time_unit: segment.time_unit,
      comment: normalizeString(segment.comment),
    };

    return !_.isEqual(segmentValues, segmentPageForm);
  };

  return {
    segmentPageForm,
    segmentPageFormIsValid,
    onChangeSsegmentPageForm,
    setSegmentPageFormIsValid,
    isDirtySegmentPageForm,
  };
};
