import { useReactQueryCache } from "@queries/getByIdFromCache";
import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { useQuery } from "react-query";
import { ITrack, Meta } from "types";

type GetTrackListPayload = {
  query: {
    episode_id: string;
    page: number;
    limit: number;
  };
};

type GetTracksListResponse = {
  results: ITrack[];
  meta: Meta;
};

const getTrackList = async ({ query }: GetTrackListPayload) => {
  const { data } = await request({
    method: "GET",
    service: "track",
    url: `/`,
    query,
  });

  return data as GetTracksListResponse;
};

export const useGetTracksList = (
  query: GetTrackListPayload["query"],
  enabled = true
) => {
  return useQuery(
    [QueryKeys.Track.List, query],
    () => getTrackList({ query }),
    {
      enabled,
      refetchOnWindowFocus: true,
    }
  );
};
