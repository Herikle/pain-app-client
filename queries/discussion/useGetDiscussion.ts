import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { useQuery } from "react-query";
import { Meta } from "types";
import { DiscussionById, DiscussionFromList } from "types/discussion";

export type GetDiscussionCommentsResponse = {
  results: DiscussionFromList[];
  meta: Meta;
};

type GetDiscussionCommentsPayload = {
  query: {
    page: number;
    limit: number;
    patient_id: string;
    episode_id: string | null;
    track_id: string | null;
    segment_id: string | null;
    parent_id: string | null;
    sortBy?: string;
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

const getDiscussionById = async (discussion_id: string | null) => {
  const { data } = await request({
    method: "GET",
    service: "discussion",
    url: `/${discussion_id}`,
  });

  return data as DiscussionById;
};

export const useGetDiscussionById = (discussion_id: string | null) => {
  return useQuery(
    [QueryKeys.Discussion.ByID, discussion_id],
    () => getDiscussionById(discussion_id),
    {
      enabled: !!discussion_id,
    }
  );
};
