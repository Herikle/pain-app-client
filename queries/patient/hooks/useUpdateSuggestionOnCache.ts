import { QueryKeys } from "@queries/keys";
import { useQueryClient } from "react-query";
import { Meta } from "types";
import { GetPatientsSuggestionResponse } from "../useGetPatients";

export const useUpdatePatientsSuggestionOnCache = () => {
  const queryClient = useQueryClient();

  const deleteSuggestionFromCache = async (id: string) => {
    queryClient.setQueriesData(
      [QueryKeys.Patients.SuggestionList],
      (old: GetPatientsSuggestionResponse | undefined) => {
        if (!old) return old;

        const meta = old.meta;

        const results = old.results;

        const newResults = results.filter((result) => result._id !== id);

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
    deleteSuggestionFromCache,
  };
};
