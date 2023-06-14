import { useQuery } from "react-query";
import { request } from "@queries/request";
import { IPrompt } from "types";
import { QueryKeys } from "@queries/keys";

const getPromptById = async (id: string) => {
  const { data } = await request({
    method: "GET",
    service: "prompt",
    url: `/${id}`,
  });

  return data as IPrompt;
};

export const useGetPrompt = (id: string) => {
  return useQuery([QueryKeys.Prompt.ByID, id], () => getPromptById(id), {
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};

const getPrompts = async () => {
  const { data } = await request({
    method: "GET",
    service: "prompt",
    url: "/",
  });

  return data as IPrompt[];
};

export const useGetPrompts = () => {
  return useQuery(QueryKeys.Prompt.List, getPrompts, {
    refetchOnWindowFocus: false,
  });
};

const getLastPrompt = async () => {
  const { data } = await request({
    method: "GET",
    service: "prompt",
    url: "/last",
  });

  return data as IPrompt;
};

export const useGetLastPrompt = () => {
  return useQuery(QueryKeys.Prompt.Last, getLastPrompt, {
    refetchOnWindowFocus: false,
  });
};
