import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { useQuery } from "react-query";
import { IEpisode, Meta } from "types";

type GetEpisodesPayload = {
  query: {
    page: number;
    limit: number;
    [key: string]: any;
  };
};

export type BookMarkEpisodeItem = {
  id: string;
  _id: string;
  episode: IEpisode;
  episode_id: string;
  user_id: string;
};

export type GetBookmarkEpisodesResponse = {
  results: BookMarkEpisodeItem[];
  meta: Meta;
};

const getBookmarkEpisodes = async ({ query }: GetEpisodesPayload) => {
  const { data } = await request({
    method: "GET",
    service: "bookmark-episodes",
    url: "/",
    query,
  });

  return data as GetBookmarkEpisodesResponse;
};

export const useGetBookmarkEpisodes = (
  params: GetEpisodesPayload["query"],
  enabled = true
) => {
  return useQuery(
    [QueryKeys.BookmarkEpisodes.List, params],
    () => getBookmarkEpisodes({ query: params }),
    {
      enabled,
      keepPreviousData: true,
    }
  );
};
