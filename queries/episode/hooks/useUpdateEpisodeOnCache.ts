import { QueryKeys } from "@queries/keys";
import { useQueryClient } from "react-query";
import { GetEpisodesListResponse } from "../useGetEpisode";
import { IEpisode } from "types";
import update from "immutability-helper";

type DeleteEpisodeOnCache = {
  id: string;
};

export const useUpdateEpisodeOnCache = () => {
  const queryClient = useQueryClient();

  const deleteEpisodeOnCache = async (values: DeleteEpisodeOnCache) => {
    const { id } = values;

    queryClient.setQueriesData(
      [QueryKeys.Episode.List],
      (old: GetEpisodesListResponse) => {
        if (!old) return old;

        const episodeIndex = old.results.findIndex(
          (episode: IEpisode) => episode._id === id
        );
        if (episodeIndex > -1) {
          const newResults = update(old, {
            results: {
              $splice: [[episodeIndex, 1]],
            },
          });

          return newResults;
        }

        return old;
      }
    );
  };

  return { deleteEpisodeOnCache };
};
