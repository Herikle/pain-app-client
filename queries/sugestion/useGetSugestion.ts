import { useMutation } from "react-query";
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
  return useMutation(getScientificNameBySpecie, {
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};
