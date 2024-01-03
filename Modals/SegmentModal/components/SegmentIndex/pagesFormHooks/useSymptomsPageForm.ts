import { ISegment, ISymptom } from "types";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@utils/hooks/useDebounce";
import { useUpdateSegment } from "@queries/segment/useSegment";
import { CommonUseHookPageForm } from "..";

export const useSymptomPageForm = ({
  segment,
  episode_id,
}: CommonUseHookPageForm) => {
  const updateSegment = useUpdateSegment();

  const [symptomPageForm, setSymptomPageForm] = useState<ISymptom[]>(
    segment.symptoms
  );

  const debouncedSymptomPageForm = useDebounce(symptomPageForm, 500);

  const [firstLoad, setFirstLoad] = useState(false);

  const getValuesToSend = () => {
    if (!isDirty) return undefined;
    return symptomPageForm.map((symptom) => ({
      name: symptom.name,
      datetime: symptom.datetime,
      observation: symptom.observation,
    }));
  };

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
          symptoms: getValuesToSend(),
        },
        extra: {
          episode_id: episode_id,
        },
      });
    };

    update();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSymptomPageForm]);

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

  return {
    symptomPageForm,
    onChangeSymptomPageForm,
    isDirtySymptomPageForm,
    getValuesToSend,
    isSyncing: updateSegment.isLoading,
  };
};
