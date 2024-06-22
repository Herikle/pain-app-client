import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { useMutation, useQueryClient } from "react-query";

type CreateDiscussionPayload = {
  text: string;
  patient_id: string;
  title?: string;
  episode_id?: string | null;
  parent_id?: string;
};

const createDiscussion = async (payload: CreateDiscussionPayload) => {
  const { data } = await request({
    service: "discussion",
    url: "",
    method: "POST",
    data: payload,
  });

  return data;
};

export const useCreateDiscussion = () => {
  const queryClient = useQueryClient();

  return useMutation(createDiscussion, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.Discussion.List]);
    },
  });
};
