import { ISegmentValues } from "types";
import { useCallback, useEffect, useState } from "react";
import { IntensitiesPageForm } from "../../IntensitiesPage";
import _ from "lodash";
import { useDebounce } from "@utils/hooks/useDebounce";
import { useUpdateSegment } from "@queries/segment/useSegment";
import { CommonUseHookPageForm } from "..";

const cleanUndefined = (values: ISegmentValues | undefined) => {
  if (!values) {
    return undefined;
  }

  const newValues = {};

  Object.keys(values).forEach((key) => {
    if (values[key] !== undefined && values[key] !== null) {
      newValues[key] = values[key];
    }
  });

  return newValues;
};

export const useIntensitiesPageForm = ({
  segment,
  episode_id,
}: CommonUseHookPageForm) => {
  const updateSegment = useUpdateSegment();

  const [intensitiesPageForm, setIntensitiesPageForm] =
    useState<IntensitiesPageForm>({
      type: segment.intensities.type,
      values: cleanUndefined(segment.intensities.values),
      draw: segment.intensities.draw,
    });

  const [intensitiesPageFormIsValid, setIntensitiesPageFormIsValid] =
    useState(true);

  const debouncedIntensitiesPageForm = useDebounce(intensitiesPageForm, 500);
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
          intensities: debouncedIntensitiesPageForm,
        },
        extra: {
          episode_id: episode_id,
        },
      });
    };

    update();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedIntensitiesPageForm]);

  const onChangeIntensitiesPageForm = useCallback(
    (data: IntensitiesPageForm) => {
      setIntensitiesPageForm(data);
    },
    []
  );

  const isDirtyIntensitiesPageForm = () => {
    const intensitiesValues = {
      type: segment.intensities.type,
      draw: segment.intensities.draw ?? [],
    };

    const pageForm = {
      type: intensitiesPageForm.type,
      draw: intensitiesPageForm.draw ?? [],
    };

    const isEqualsWithoutValues = _.isEqual(pageForm, intensitiesValues);

    if (!isEqualsWithoutValues) {
      return true;
    }

    const pageFormValue = cleanUndefined(intensitiesPageForm.values) ?? {};
    const segmentValue = cleanUndefined(segment.intensities.values) ?? {};

    const isEqualsValues = _.isEqual(pageFormValue, segmentValue);

    return !isEqualsValues;
  };

  return {
    intensitiesPageForm,
    intensitiesPageFormIsValid,
    onChangeIntensitiesPageForm,
    setIntensitiesPageFormIsValid,
    isDirtyIntensitiesPageForm,
    isSyncing: updateSegment.isLoading,
  };
};
