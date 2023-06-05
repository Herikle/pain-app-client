import { useQueryClient } from "react-query";

export const useReactQueryCache = () => {
  const useQuery = useQueryClient();

  const getByIdFromCache = (_id: string, queryKey: any) => {
    const data = useQuery.getQueryData([queryKey], { exact: false }) as any;

    if (data) {
      const results = data.results as any[];

      const item = results.find((item) => item._id === _id);

      return item;
    }

    return undefined;
  };

  return {
    getByIdFromCache,
  };
};
