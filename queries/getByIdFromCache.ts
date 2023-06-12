import { useQueryClient } from "react-query";
import { Meta } from "types";

type GenericData = {
  _id: string;
};

type GenericListData = {
  results: GenericData[];
  metal: Meta;
};

export const useReactQueryCache = () => {
  const useQuery = useQueryClient();

  const getByIdFromCache = <T>(_id: string, queryKey: any) => {
    try {
      const datas = useQuery.getQueriesData([queryKey]) as any[];
      console.log(datas);
      if (datas && datas.length > 0) {
        for (const data of datas) {
          const genericData = data?.[1] as GenericListData;
          const results = genericData?.results;
          if (results) {
            const item = results.find((item) => item._id === _id);
            if (item) {
              return item as T;
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
    return undefined;
  };

  return {
    getByIdFromCache,
  };
};
