import { RequestService, request } from "@queries/request";
import { ToastError, ToastSuccess } from "@utils/toasts";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { ITrack } from "types";
import { useUpdateTrackOnCache } from "./hooks/useUpdateTrackOnCache";
import { hasToken } from "@utils/localStorage/token";

export const getTrackService = (): RequestService => {
  return hasToken() ? "track" : "track-guest";
};

type CreateTrackPayload = {
  body: {
    episode_id: string;
  };
};

const createTrack = async ({ body }: CreateTrackPayload) => {
  const { data } = await request({
    method: "POST",
    service: getTrackService(),
    url: "/",
    data: body,
  });

  return data as ITrack;
};

export const useCreateTrack = () => {
  const { addTrackOnCache } = useUpdateTrackOnCache();
  return useMutation(createTrack, {
    onSuccess: async (data) => {
      addTrackOnCache({
        track: data,
      });
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
  internal: {
    episode_id: string;
  };
};

const updateTrack = async ({ params, body }: UpdateTrackPayload) => {
  const { data } = await request({
    method: "PATCH",
    service: getTrackService(),
    url: `/${params.track_id}`,
    data: body,
  });

  return data as ITrack;
};

export const useUpdateTrack = () => {
  const { updateTrackOnCache } = useUpdateTrackOnCache();
  return useMutation(updateTrack, {
    onMutate: async (variables) => {
      updateTrackOnCache({
        id: variables.params.track_id,
        track: variables.body,
        episode_id: variables.internal.episode_id,
      });
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
  const { removeTrackOnCache } = useUpdateTrackOnCache();
  return useMutation(deleteTrack, {
    onSuccess: (data) => {
      removeTrackOnCache({
        track: data,
      });
      ToastSuccess("Track deleted successfully");
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};
