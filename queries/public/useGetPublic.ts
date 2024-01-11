import { request } from "@queries/request";
import { CommonKeyStringPair, IAttributesConfig } from "types";

export type GetPublicAttributesResponse = {
  attributes: CommonKeyStringPair;
  attributesConfig: IAttributesConfig;
};

export const getPublicAttributes = async () => {
  const { data } = await request({
    method: "GET",
    service: "public",
    url: "/attributes",
  });

  return data as GetPublicAttributesResponse | undefined;
};
