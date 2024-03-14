import { useQuery } from "react-query";
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

type GetScientificNameBySpeciePayload = {
  specie: string | undefined;
};

export const useGetScientificNameBySpecie = ({
  specie,
}: GetScientificNameBySpeciePayload) => {
  return useQuery(
    [QueryKeys.Patients.GetScientificName, specie],
    () => {
      if (!specie) return Promise.resolve({ scientific_name: "" });

      return getScientificNameBySpecie(specie);
    },
    {
      onError: (error: AxiosError) => {
        ToastError(error);
      },
    }
  );
};
