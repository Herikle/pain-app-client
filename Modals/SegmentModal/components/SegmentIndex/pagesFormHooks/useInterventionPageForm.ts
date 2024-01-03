import { IIntervetion, ISegment } from "types";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@utils/hooks/useDebounce";
import { useUpdateSegment } from "@queries/segment/useSegment";
import { CommonUseHookPageForm } from "..";

export const useInterventionPageForm = ({
  episode_id,
  segment,
}: CommonUseHookPageForm) => {
  const updateSegment = useUpdateSegment();

  const [interventionPageForm, setInterventionPageForm] = useState<
    IIntervetion[]
  >(segment.interventions);

  const debouncedInterventionPageForm = useDebounce(interventionPageForm, 500);

  const [firstLoad, setFirstLoad] = useState(false);

  const getValuesToSend = () => {
    if (!isDirty) return undefined;
    return interventionPageForm.map((intervention) => ({
      name: intervention.name,
      datetime: intervention.datetime,
      dose: intervention.dose,
      effective: intervention.effective,
      observation: intervention.observation,
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
          interventions: getValuesToSend(),
        },
        extra: {
          episode_id: episode_id,
        },
      });
    };

    update();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInterventionPageForm]);

  const [isDirty, setIsDirty] = useState(false);
  const onChangeInterventionPageForm = useCallback((data: IIntervetion[]) => {
    setInterventionPageForm(data);
    setIsDirty(true);
  }, []);

  useEffect(() => {
    setIsDirty(false);
  }, [segment.interventions]);

  const isDirtyInterventionPageForm = () => {
    return isDirty;
  };

  return {
    interventionPageForm,
    onChangeInterventionPageForm,
    isDirtyInterventionPageForm,
    getValuesToSend,
    isSyncing: updateSegment.isLoading,
  };
};
