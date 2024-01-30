import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "@queries/request";
import { IMe, IPrompt } from "types";
import { QueryKeys } from "@queries/keys";
import { ToastError } from "@utils/toasts";
import { AxiosError } from "axios";

const getScientificNameBySpecie = async (specie: string) => {
  const { data } = await request({
    method: "GET",
    service: "sugestion",
    url: `/scientificName/${specie}`,
  });

  return data as {
    scientific_name: string;
  };
};

export const useGetScientificNameBySpecie = () => {
  const queryClient = useQueryClient();

  return useMutation(getScientificNameBySpecie, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.Auth.Me]);
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};
