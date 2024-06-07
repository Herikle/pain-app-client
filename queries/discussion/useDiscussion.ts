import { request } from "@queries/request";
import { useMutation } from "react-query";

type CreateDiscussionPayload = {
  text: string;
  episode_id?: string;
  patient_id?: string;
};

const createDiscussion = async (payload: CreateDiscussionPayload) => {
  const { data } = await request({
    service: "discussion",
    url: "",
    method: "POST",
  });

  return data;
};

export const useCreateDiscussion = () => {
  return useMutation(createDiscussion);
};
