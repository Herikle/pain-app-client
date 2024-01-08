import { request } from "@queries/request";
import { useMutation } from "react-query";
import { IJustificationType, ISegmentJustification } from "types";
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

type UpdateSegmentJustificationPayload = {
  params: {
    justification_id: string;
  };
  body: {
    title?: string;
    description?: string;
    sources?: string;
    type_of_evidence?: IJustificationType;
    ranking?: {
      excruciating: number | undefined;
      disabling: number | undefined;
      hurful: number | undefined;
      annoying: number | undefined;
      no_pain: number | undefined;
    };
  };
};

const updateSegmentJustification = async ({
  params,
  body,
}: UpdateSegmentJustificationPayload) => {
  const { data } = await request({
    method: "PATCH",
    url: `${params.justification_id}`,
    service: "segment-justification",
    data: body,
  });

  return data as ISegmentJustification;
};

export const useUpdateSegmentJustification = () => {
  const { updateSegmentJustificationOnCache } =
    useUpdateJustificationSegmentOnCache();

  return useMutation(updateSegmentJustification, {
    onSuccess: (data) => {
      updateSegmentJustificationOnCache(data);
    },
  });
};

type DeleteSegmentJustificationPayload = {
  params: {
    justification_id: string;
  };
  helpers: {
    segment_id: string;
  };
};

const deleteSegmentJustification = async ({
  params,
}: DeleteSegmentJustificationPayload) => {
  const { data } = await request({
    method: "DELETE",
    url: `${params.justification_id}`,
    service: "segment-justification",
  });

  return data as ISegmentJustification;
};

export const useDeleteSegmentJustification = () => {
  const { deleteSegmentJustificationOnCache } =
    useUpdateJustificationSegmentOnCache();

  return useMutation(deleteSegmentJustification, {
    onSuccess: (data, { params, helpers }) => {
      deleteSegmentJustificationOnCache(
        params.justification_id,
        helpers.segment_id
      );
    },
  });
};
