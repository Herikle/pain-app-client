import { IIntervetion, ISegment } from "types";
import { useCallback, useEffect, useState } from "react";

export const useInterventionPageForm = (segment: ISegment) => {
  const [interventionPageForm, setInterventionPageForm] = useState<
    IIntervetion[]
  >(segment.interventions);

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

  return {
    interventionPageForm,
    onChangeInterventionPageForm,
    isDirtyInterventionPageForm,
    getValuesToSend,
  };
};
