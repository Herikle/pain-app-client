import { useReactQueryCache } from "@queries/getByIdFromCache";
import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { useQuery } from "react-query";
import { IEpisode, Meta } from "types";
import { getEpisodeService } from "./useEpisode";

type GetEpisodsListPayload = {
  query: {
    patient_id: string;
    page: number;
    limit: number;
    [key: string]: any;
  };
};

export type GetEpisodesListResponse = {
  results: IEpisode[];
  meta: Meta;
};

const getEpisodsList = async ({ query }: GetEpisodsListPayload) => {
  const { data } = await request({
    method: "GET",
    service: "episode",
    url: `/`,
    query,
  });

  return data as GetEpisodesListResponse;
};

export const useGetEpisodesList = (
  query: GetEpisodsListPayload["query"],
  enabled = true
) => {
  return useQuery(
    [QueryKeys.Episode.List, query],
    () => getEpisodsList({ query }),
    {
      enabled,
    }
  );
};

type GetEpisodeByIdPayload = {
  params: {
    episode_id: string;
  };
};

export type GetEpisodeByIdResponse = IEpisode;

const getEpisodeById = async ({ params }: GetEpisodeByIdPayload) => {
  const { data } = await request({
    method: "GET",
    service: getEpisodeService(),
    url: `/${params.episode_id}`,
  });

  return data as GetEpisodeByIdResponse;
};

export const useGetEpisodeById = (
  params: GetEpisodeByIdPayload["params"],
  enabled = true
) => {
  const { getByIdFromCache } = useReactQueryCache();

  return useQuery(
    [QueryKeys.Episode.ByID, params],
    () => getEpisodeById({ params }),
    {
      enabled,
      placeholderData: () => {
        return getByIdFromCache<IEpisode>(
          params.episode_id,
          QueryKeys.Episode.List
        );
      },
    }
  );
};

type GetEpisodesSuggestionPayload = {
  query: {
    page: number;
    limit: number;
    [key: string]: any;
  };
};

export type GetEpisodesSuggestionResponse = {
  results: IEpisode[];
  meta: Meta;
};

const getEpisodesSuggestion = async ({
  query,
}: GetEpisodesSuggestionPayload) => {
  const { data } = await request({
    method: "GET",
    service: "episode",
    url: "/suggestion",
    query,
  });

  return data as GetEpisodesSuggestionResponse;
};

export const useGetEpisodesSugestion = (
  params: GetEpisodesSuggestionPayload["query"],
  enabled = true
) => {
  return useQuery(
    [QueryKeys.Episode.SuggestionList, params],
    () => getEpisodesSuggestion({ query: params }),
    {
      enabled,
      keepPreviousData: true,
    }
  );
};
