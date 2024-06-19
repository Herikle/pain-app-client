import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { useQuery } from "react-query";
import { IPatient, Meta } from "types";

export type GetDiscussionCommentsResponse = {
  results: { _id: string }[];
  meta: Meta;
};

type GetDiscussionCommentsPayload = {
  query: {
    page: number;
    limit: number;
    episode_id: string | null;
    patient_id: string | null;
    [key: string]: any;
  };
};

const getDiscussionComments = async ({
  query,
}: GetDiscussionCommentsPayload) => {
  const { data } = await request({
    method: "GET",
    service: "discussion",
    url: "/",
    query,
  });

  return data as GetDiscussionCommentsResponse;
};

export const useGetDiscussionComments = (
  params: GetDiscussionCommentsPayload["query"],
  enabled = true
) => {
  return useQuery(
    [QueryKeys.Discussion.List, params],
    () => getDiscussionComments({ query: params }),
    {
      enabled,
      keepPreviousData: true,
    }
  );
};
