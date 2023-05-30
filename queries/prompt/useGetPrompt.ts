import { useQuery } from "react-query";
import { request } from "@queries/request";
import { IPrompt } from "types";
import { QueryKeys } from "@queries/keys";

const getPrompt = async () => {
  const { data } = await request({
    method: "GET",
    service: "prompt",
    url: "/",
  });

  return data as IPrompt;
};

export const useGetPrompt = () => {
  return useQuery(QueryKeys.Prompt.GetPrompt, getPrompt, {
    refetchOnWindowFocus: false,
  });
};
