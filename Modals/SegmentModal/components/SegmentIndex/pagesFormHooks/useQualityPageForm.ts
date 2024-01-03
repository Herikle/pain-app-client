import { ISegment } from "types";
import { useCallback, useEffect, useState } from "react";
import { QualityFormValues } from "../../QualityPage";
import _ from "lodash";
import { normalizeString } from "@utils/helpers/string";
import { useDebounce } from "@utils/hooks/useDebounce";
import { useUpdateSegment } from "@queries/segment/useSegment";
import { CommonUseHookPageForm } from "..";

export const useQualityPageForm = ({
  episode_id,
  segment,
}: CommonUseHookPageForm) => {
  const updateSegment = useUpdateSegment();

  const [qualityPageForm, setQualityPageForm] = useState<QualityFormValues>({
    anatomy: normalizeString(segment.quality?.anatomy),
    comment: normalizeString(segment.quality?.comment),
    depth: segment.quality?.depth,
    texture: segment.quality?.texture,
  });

  const [qualityPageFormIsValid, setQualityPageFormIsValid] = useState(true);

  const debouncedQualityPageForm = useDebounce(qualityPageForm, 500);

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
          quality: debouncedQualityPageForm,
        },
        extra: {
          episode_id: episode_id,
        },
      });
    };

    update();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQualityPageForm]);

  const onChangeQualityPageForm = useCallback((data: QualityFormValues) => {
    setQualityPageForm(data);
  }, []);

  const isDirtyQualityPageForm = () => {
    const qualityValues = {
      anatomy: normalizeString(segment.quality?.anatomy),
      comment: normalizeString(segment.quality?.comment),
      depth: segment.quality?.depth,
      texture: segment.quality?.texture,
    };

    const isEqual = _.isEqual(qualityPageForm, qualityValues);

    return !isEqual;
  };

  return {
    qualityPageForm,
    qualityPageFormIsValid,
    onChangeQualityPageForm,
    setQualityPageFormIsValid,
    isDirtyQualityPageForm,
    isSyncing: updateSegment.isLoading,
  };
};
