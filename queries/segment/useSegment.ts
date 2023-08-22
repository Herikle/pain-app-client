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

type CreateSegmentPayload = {
  body: {
    track_id: string;
  };
  extra: {
    episode_id: string;
  };
};

const createSegment = async ({ body }: CreateSegmentPayload) => {
  const { data } = await request({
    method: "POST",
    service: "segment",
    data: body,
  });

  return data as ISegment;
};

export const useCreateSegment = () => {
  const { addSegmentOnCache } = useUpdateSegmentOnCache();
  return useMutation(createSegment, {
    onSuccess: (data, { extra }) => {
      ToastSuccess("Segment Created");

      addSegmentOnCache({
        segment: data,
        episode_id: extra.episode_id,
      });
    },
    onError: ToastError,
  });
};

type DeleteSegmentPayload = {
  params: {
    segment_id: string;
  };
  extra: {
    episode_id: string;
  };
};

const deleteSegment = async ({ params }: DeleteSegmentPayload) => {
  const { data } = await request({
    method: "DELETE",
    service: "segment",
    url: `/${params.segment_id}`,
  });

  return data as ISegment;
};

export const useDeleteSegment = () => {
  const { deleteSegmentOnCache } = useUpdateSegmentOnCache();
  return useMutation(deleteSegment, {
    onSuccess: (data, { extra }) => {
      ToastSuccess("Segment Deleted");

      deleteSegmentOnCache({
        segment: data,
        episode_id: extra.episode_id,
      });
    },
    onError: ToastError,
  });
};
