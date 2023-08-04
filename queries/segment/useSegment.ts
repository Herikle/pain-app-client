import { request } from "@queries/request";
import { ToastError, ToastSuccess } from "@utils/toats";
import { useMutation } from "react-query";
import { IIntervetion, ISegment, ISymptom } from "types";
import { useUpdateSegmentOnCache } from "./hooks/useUpdateSegmentOnCache";

type CreationInterventions = Omit<
  IIntervetion,
  "_id" | "createdAt" | "updatedAt"
>[];

type CreationSymptoms = Omit<ISymptom, "_id" | "createdAt" | "updatedAt">[];

type UpdateSegmentPayload = {
  params: {
    segment_id: string;
  };
  body: Partial<
    Omit<ISegment, "interventions" | "symptoms"> & {
      interventions: CreationInterventions;
      symptoms: CreationSymptoms;
    }
  >;
  extra: {
    episode_id: string;
  };
};

const updateSegment = async ({ params, body }: UpdateSegmentPayload) => {
  const { data } = await request({
    method: "PATCH",
    service: "segment",
    url: `/${params.segment_id}`,
    data: body,
  });

  return data as ISegment;
};

export const useUpdateSegment = () => {
  const { updateSegmentOnCache } = useUpdateSegmentOnCache();
  return useMutation(updateSegment, {
    onSuccess: (data, { extra }) => {
      ToastSuccess("Segment Updated");

      updateSegmentOnCache({
        segment: data,
        episode_id: extra.episode_id,
      });
    },
    onError: ToastError,
  });
};
