import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { ToastSuccess } from "@utils/toats";
import { useMutation, useQueryClient } from "react-query";
import { ITrack } from "types";

type CreateTrackPayload = {
  body: {
    episode_id: string;
  };
};

const createTrack = async ({ body }: CreateTrackPayload) => {
  const { data } = await request({
    method: "POST",
    service: "track",
    url: "/",
    data: body,
  });

  return data as ITrack;
};

export const useCreateTrack = () => {
  const queryClient = useQueryClient();
  return useMutation(createTrack, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.Track.List]);
    },
  });
};

type UpdateTrackPayload = {
  params: {
    track_id: string;
  };
  body: {
    name?: string;
    comment?: string;
    pain_type: ITrack["pain_type"];
  };
};

const updateTrack = async ({ params, body }: UpdateTrackPayload) => {
  const { data } = await request({
    method: "PATCH",
    service: "track",
    url: `/${params.track_id}`,
    data: body,
  });

  return data as ITrack;
};

export const useUpdateTrack = () => {
  const queryClient = useQueryClient();
  return useMutation(updateTrack, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.Track.List]);
      ToastSuccess("Track updated successfully");
    },
  });
};