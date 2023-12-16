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

  const updateSegmentJustificationOnCache = async (
    justification: ISegmentJustification
  ) => {
    const segment_id = justification.segment_id;
    queryClient.setQueriesData(
      [QueryKeys.SegmentJustification.List, { segment_id }],
      (old: ISegmentJustification[] | undefined) => {
        const realOld = old ?? [];

        const newJustifications = realOld.map((item) =>
          item._id === justification._id ? justification : item
        );

        return newJustifications;
      }
    );
  };

  const deleteSegmentJustificationOnCache = async (
    id: string,
    segment_id: string
  ) => {
    queryClient.setQueriesData(
      [QueryKeys.SegmentJustification.List, { segment_id }],
      (old: ISegmentJustification[] | undefined) => {
        const realOld = old ?? [];

        const newJustifications = realOld.filter((item) => item._id !== id);

        return newJustifications;
      }
    );
  };

  return {
    addSegmentJustificationOnCache,
    updateSegmentJustificationOnCache,
    deleteSegmentJustificationOnCache,
  };
};
