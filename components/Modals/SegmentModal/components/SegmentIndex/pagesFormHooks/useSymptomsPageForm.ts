import { ISegment, ISymptom } from "types";
import { useCallback, useEffect, useState } from "react";

export const useSymptomPageForm = (segment: ISegment) => {
  const [symptomPageForm, setSymptomPageForm] = useState<ISymptom[]>(
    segment.symptoms
  );

  const [isDirty, setIsDirty] = useState(false);

  const onChangeSymptomPageForm = useCallback((data: ISymptom[]) => {
    setSymptomPageForm(data);
    setIsDirty(true);
  }, []);

  useEffect(() => {
    setIsDirty(false);
  }, [segment.symptoms]);

  const isDirtySymptomPageForm = () => {
    return isDirty;
  };

  const getValuesToSend = () => {
    if (!isDirty) return undefined;
    return symptomPageForm.map((symptom) => ({
      name: symptom.name,
      datetime: symptom.datetime,
      observation: symptom.observation,
    }));
  };

  return {
    symptomPageForm,
    onChangeSymptomPageForm,
    isDirtySymptomPageForm,
    getValuesToSend,
  };
};
