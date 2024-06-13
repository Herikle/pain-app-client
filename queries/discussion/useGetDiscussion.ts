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
    episode_id: string;
    [key: string]: any;
  };
};

const getDiscussionComments = async ({
  query,
}: GetDiscussionCommentsPayload) => {
  return new Promise<GetDiscussionCommentsResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        results: [],
        meta: {
          current_count: 0,
          current_page: 1,
          total_count: 0,
          items_per_page: 10,
          total_pages: 1,
        },
      });
    }, 1000);
  });
  // const { data } = await request({
  //   method: "GET",
  //   service: "bookmark-patients",
  //   url: "/",
  //   query,
  // });

  // return data as GetDiscussionCommentsResponse;
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
