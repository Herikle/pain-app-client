import { QueryKeys } from "@queries/keys";
import { RequestService, request } from "@queries/request";
import { hasToken } from "@utils/localStorage/token";
import { ToastError, ToastSuccess } from "@utils/toats";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IEpisode } from "types";

export const getEpisodeService = (): RequestService => {
  return hasToken() ? "episode" : "episode-guest";
};

type CreateEpisodePayload = {
  body: {
    patient_id: string | undefined;
  };
};

const createEpisode = async ({ body }: CreateEpisodePayload) => {
  const { data } = await request({
    method: "POST",
    service: getEpisodeService(),
    url: "/",
    data: body,
  });

  return data as IEpisode;
};

export const useCreateEpisode = () => {
  return useMutation(createEpisode);
};

type UpdateEpisode = Partial<
  Omit<IEpisode, "_id" | "patient_id" | "creator_id" | "start_date">
> & {
  start_date?: Date;
};

type UpdateEpisodePayload = {
  params: {
    episode_id: string;
  };
  body: UpdateEpisode;
};

const updateEpisode = async ({ params, body }: UpdateEpisodePayload) => {
  const { data } = await request({
    method: "PATCH",
    service: getEpisodeService(),
    url: `/${params.episode_id}`,
    data: body,
  });

  return data as IEpisode;
};

export const useUpdateEpisode = () => {
  const queryClient = useQueryClient();

  return useMutation(updateEpisode, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.Episode.ByID]);
      ToastSuccess("Episode updated successfully");
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};

type DeleteEpisodePayload = {
  params: {
    episode_id: string;
  };
};

const deleteEpisode = async ({ params }: DeleteEpisodePayload) => {
  const { data } = await request({
    method: "DELETE",
    service: "episode",
    url: `/${params.episode_id}`,
  });
};

export const useDeleteEpisode = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteEpisode, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.Episode.ByID]);
      ToastSuccess("Episode deleted successfully");
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};
