import { request } from "@queries/request";
import { useMutation } from "react-query";
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
