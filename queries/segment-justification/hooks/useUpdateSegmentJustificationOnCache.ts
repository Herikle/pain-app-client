import { QueryKeys } from "@queries/keys";
import { useQueryClient } from "react-query";
import { ISegmentJustification } from "types";

export const useUpdateJustificationSegmentOnCache = () => {
  const queryClient = useQueryClient();

  const addSegmentJustificationOnCache = async (
    justification: ISegmentJustification
  ) => {
    const segment_id = justification.segment_id;
    queryClient.setQueriesData(
      [QueryKeys.SegmentJustification.List, { segment_id }],
      (old: ISegmentJustification[] | undefined) => {
        const realOld = old ?? [];

        return [...realOld, justification];
      }
    );
  };

  return { addSegmentJustificationOnCache };
};
