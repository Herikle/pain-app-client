import { QueryKeys } from "@queries/keys";
import { useQueryClient } from "react-query";
import { Meta } from "types";
import { GetBookmarkPatientsResponse } from "../useGetBookmarkPatients";

export const useUpdateBookmarksOnCache = () => {
  const queryClient = useQueryClient();

  const deleteBookmarkFromCache = async (id: string) => {
    queryClient.setQueriesData(
      [QueryKeys.BookmarkPatients.List],
      (old: GetBookmarkPatientsResponse | undefined) => {
        if (!old) return old;

        const meta = old.meta;

        const results = old.results;

        const newResults = results.filter((result) => result.patient_id !== id);

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
  };
};
