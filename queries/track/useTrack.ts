import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { ToastError, ToastSuccess } from "@utils/toats";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { ITrack } from "types";
import { useUpdateTrackOnCache } from "./hooks/useUpdateTrackOnCache";

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
    onError: (error: AxiosError) => {
      ToastError(error);
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
  const { updateTrackOnCache } = useUpdateTrackOnCache();
  return useMutation(updateTrack, {
    onSuccess: (data) => {
      updateTrackOnCache({
        track: data,
      });
      ToastSuccess("Track updated successfully");
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};

type DeleteTrackPayload = {
  params: {
    track_id: string;
  };
};

const deleteTrack = async ({ params }: DeleteTrackPayload) => {
  const { data } = await request({
    method: "DELETE",
    service: "track",
    url: `/${params.track_id}`,
  });

  return data as ITrack;
};

export const useDeleteTrack = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteTrack, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.Track.List]);
      ToastSuccess("Track deleted successfully");
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};
