import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { useQuery } from "react-query";
import { IPatient, Meta } from "types";

type GetPatientsPayload = {
  query: {
    page: number;
    limit: number;
    [key: string]: any;
  };
};

export type BookMarkItem = {
  id: string;
  _id: string;
  patient: IPatient;
  patient_id: string;
  user_id: string;
};

export type GetBookmarkPatientsResponse = {
  results: BookMarkItem[];
  meta: Meta;
};

const getBookmarkPatients = async ({ query }: GetPatientsPayload) => {
  const { data } = await request({
    method: "GET",
    service: "bookmark-patients",
    url: "/",
    query,
  });

  return data as GetBookmarkPatientsResponse;
};

export const useGetBookmarkPatients = (
  params: GetPatientsPayload["query"],
  enabled = true
) => {
  return useQuery(
    [QueryKeys.BookmarkPatients.List, params],
    () => getBookmarkPatients({ query: params }),
    {
      enabled,
      keepPreviousData: true,
    }
  );
};
