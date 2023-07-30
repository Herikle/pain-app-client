import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { ToastError, ToastSuccess } from "@utils/toats";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { ISegment, ITrack } from "types";
import { useUpdateSegmentOnCache } from "./hooks/useUpdateSegmentOnCache";

type UpdateSegmentPayload = {
  params: {
    segment_id: string;
  };
  body: Partial<ISegment>;
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
