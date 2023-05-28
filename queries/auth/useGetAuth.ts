import { useQuery } from "react-query";
import { request } from "@queries/request";
import { IMe } from "types";
import { QueryKeys } from "@queries/keys";
import { minutes } from "utils/helpers/time";

const getAuthenticatedUser = async () => {
  const { data } = await request({
    method: "GET",
    service: "auth",
    url: "/me",
  });

  return data as IMe;
};

export const useGetMe = () => {
  return useQuery(QueryKeys.Auth.Me, getAuthenticatedUser, {
    staleTime: minutes(60),
    refetchOnWindowFocus: false,
    retry: false,
  });
};
