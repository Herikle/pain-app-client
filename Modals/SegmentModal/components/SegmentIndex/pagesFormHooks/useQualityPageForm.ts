import { ISegment } from "types";
import { useCallback, useState } from "react";
import { QualityFormValues } from "../../QualityPage";
import _ from "lodash";
import { normalizeString } from "@utils/helpers/string";

export const useQualityPageForm = (segment: ISegment) => {
  const [qualityPageForm, setQualityPageForm] = useState<QualityFormValues>({
    anatomy: normalizeString(segment.quality?.anatomy),
    comment: normalizeString(segment.quality?.comment),
    depth: segment.quality?.depth,
    texture: segment.quality?.texture,
  });

  const [qualityPageFormIsValid, setQualityPageFormIsValid] = useState(true);

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
  };
};
