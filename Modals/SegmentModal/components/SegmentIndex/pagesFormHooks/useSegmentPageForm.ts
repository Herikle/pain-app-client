import { ISegment } from "types";
import { SegmentPageForm } from "../../SegmentPage";
import { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import {
  getDateAndTimeFromIsoDate,
  getDateFromString,
} from "@utils/helpers/date";
import { normalizeString } from "@utils/helpers/string";
import { useDebounce } from "@utils/hooks/useDebounce";
import { useUpdateSegment } from "@queries/segment/useSegment";
import { CommonUseHookPageForm } from "..";

export const useSegmentPageForm = ({
  episode_id,
  segment,
}: CommonUseHookPageForm) => {
  const updateSegment = useUpdateSegment();

  const [segmentPageForm, setSegmentPageForm] = useState<SegmentPageForm>({
    name: normalizeString(segment.name),
    start: segment.start ?? 0,
    end: segment.end ?? 0,
    estimative_type: normalizeString(segment.estimative_type) as any,
    pain_type: segment.pain_type,
    start_date: getDateFromString(segment.start_date),
    time_unit: segment.time_unit,
    comment: normalizeString(segment.comment),
  });

  const debouncedSegmentPageForm = useDebounce(segmentPageForm, 500);

  const [firstLoad, setFirstLoad] = useState(false);

  useEffect(() => {
    if (!firstLoad) {
      setFirstLoad(true);
      return;
    }

    const update = async () => {
      await updateSegment.mutateAsync({
        params: {
          segment_id: segment._id,
        },
        body: {
          ...debouncedSegmentPageForm,
        },
        extra: {
          episode_id: episode_id,
        },
      });
    };

    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSegmentPageForm]);

  const [segmentPageFormIsValid, setSegmentPageFormIsValid] = useState(true);

  const onChangeSsegmentPageForm = useCallback((data: SegmentPageForm) => {
    setSegmentPageForm(data);
  }, []);

  return {
    segmentPageFormIsValid,
    onChangeSsegmentPageForm,
    setSegmentPageFormIsValid,
    isSyncing: updateSegment.isLoading,
    segmentPageForm,
  };
};
