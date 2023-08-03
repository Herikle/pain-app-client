import { ISegment } from "types";
import { useCallback, useState } from "react";
import { QualityFormValues } from "../../QualityPage";
import _ from "lodash";
import { normalizeString } from "@utils/helpers/string";

export const useQualityPageForm = (segment: ISegment) => {
  const [qualityPageForm, setQualityPageForm] = useState<QualityFormValues>({
    anatomy: segment.quality?.anatomy,
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
      anatomy: segment.quality?.anatomy,
      comment: normalizeString(segment.quality?.comment),
      depth: segment.quality?.depth,
      texture: segment.quality?.texture,
    };

    return !_.isEqual(qualityValues, qualityPageForm);
  };

  return {
    qualityPageForm,
    qualityPageFormIsValid,
    onChangeQualityPageForm,
    setQualityPageFormIsValid,
    isDirtyQualityPageForm,
  };
};
