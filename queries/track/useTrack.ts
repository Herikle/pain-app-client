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
