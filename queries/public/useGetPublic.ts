import { request } from "@queries/request";
import { CommonKeyStringPair } from "types";

export const getPublicAttributes = async () => {
  const { data } = await request({
    method: "GET",
    service: "public",
    url: "/attributes",
  });

  return data as CommonKeyStringPair;
};
