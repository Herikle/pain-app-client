import { request } from "@queries/request";
import { useMutation } from "react-query";
import { ISegmentJustification } from "types";
import { useUpdateJustificationSegmentOnCache } from "./hooks/useUpdateSegmentJustificationOnCache";

type CreateSegmentJustificationPayload = {
  params: {
    segment_id: string;
  };
};

const createSegmentJustification = async ({
  params,
}: CreateSegmentJustificationPayload) => {
  const { data } = await request({
    method: "POST",
    url: `${params.segment_id}`,
    service: "segment-justification",
  });

  return data as ISegmentJustification;
};

export const useCreateSegmentJustification = () => {
  const { addSegmentJustificationOnCache } =
    useUpdateJustificationSegmentOnCache();

  return useMutation(createSegmentJustification, {
    onSuccess: (data) => {
      addSegmentJustificationOnCache(data);
    },
  });
};
