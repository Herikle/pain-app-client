import { ISegment, ISegmentValues } from "types";
import { useCallback, useState } from "react";
import { IntensitiesPageForm } from "../../IntensitiesPage";
import _ from "lodash";
import { normalizeString } from "@utils/helpers/string";

const cleanUndefined = (values: ISegmentValues | undefined) => {
  if (!values) {
    return undefined;
  }

  const newValues = {};

  Object.keys(values).forEach((key) => {
    if (values[key] !== undefined) {
      newValues[key] = values[key];
    }
  });

  return newValues;
};

export const useIntensitiesPageForm = (segment: ISegment) => {
  const [intensitiesPageForm, setIntensitiesPageForm] =
    useState<IntensitiesPageForm>({
      type: segment.intensities.type,
      justification: normalizeString(segment.intensities.justification),
      values: cleanUndefined(segment.intensities.values),
      draw: segment.intensities.draw,
    });

  const [intensitiesPageFormIsValid, setIntensitiesPageFormIsValid] =
    useState(true);

  const onChangeIntensitiesPageForm = useCallback(
    (data: IntensitiesPageForm) => {
      setIntensitiesPageForm(data);
    },
    []
  );

  const isDirtyIntensitiesPageForm = () => {
    const intensitiesValues = {
      type: segment.intensities.type,
      justification: normalizeString(segment.intensities.justification),
      draw: segment.intensities.draw ?? [],
    };

    const pageForm = {
      type: intensitiesPageForm.type,
      justification: normalizeString(intensitiesPageForm.justification),
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
  };
};
