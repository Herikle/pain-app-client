import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { ToastError, ToastSuccess } from "@utils/toats";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IEpisode } from "types";

type CreateEpisodePayload = {
  body: {
    patient_id: string;
  };
};

const createEpisode = async ({ body }: CreateEpisodePayload) => {
  const { data } = await request({
    method: "POST",
    service: "episode",
    url: "/",
    data: body,
  });

  return data as IEpisode;
};

export const useCreateEpisode = () => {
  return useMutation(createEpisode);
};

type UpdateEpisode = Partial<
  Omit<IEpisode, "_id" | "patient_id" | "creator_id">
>;

type UpdateEpisodePayload = {
  params: {
    episode_id: string;
  };
  body: UpdateEpisode;
};

const updateEpisode = async ({ params, body }: UpdateEpisodePayload) => {
  const { data } = await request({
    method: "PATCH",
    service: "episode",
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
