import { QueryKeys } from "@queries/keys";
import { useQueryClient } from "react-query";
import { Meta } from "types";
import { GetBookmarkEpisodesResponse } from "../useGetBookmarkPatients";

export const useUpdateEpisodeBookmarksOnCache = () => {
  const queryClient = useQueryClient();

  const deleteBookmarkFromCache = async (id: string) => {
    queryClient.setQueriesData(
      [QueryKeys.BookmarkEpisodes.List],
      (old: GetBookmarkEpisodesResponse | undefined) => {
        if (!old) return old;

        const meta = old.meta;

        const results = old.results;

        const newResults = results.filter((result) => result.episode_id !== id);

        const newMeta: Meta = {
          ...meta,
          total_count: meta.total_count - 1,
          total_pages: Math.ceil((meta.total_count - 1) / meta.items_per_page),
        };

        return {
          results: newResults,
          meta: newMeta,
        };
      }
    );
  };

  const deleteBookMarkFromCacheByEpisodeId = async (episode_id: string) => {
    queryClient.setQueriesData(
      [QueryKeys.BookmarkPatients.List],
      (old: GetBookmarkEpisodesResponse | undefined) => {
        if (!old) return old;

        const meta = old.meta;

        const results = old.results;

        const newResults = results.filter(
          (result) => result.episode_id !== episode_id
        );

        const newMeta: Meta = {
          ...meta,
          total_count: meta.total_count - 1,
          total_pages: Math.ceil((meta.total_count - 1) / meta.items_per_page),
        };

        return {
          results: newResults,
          meta: newMeta,
        };
      }
    );
  };

  return {
    deleteBookmarkFromCache,
    deleteBookMarkFromCacheByEpisodeId,
  };
};
