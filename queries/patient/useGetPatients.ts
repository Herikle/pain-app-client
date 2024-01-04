import { useQuery } from "react-query";
import { request } from "@queries/request";
import { IPatient, Meta } from "types";
import { QueryKeys } from "@queries/keys";
import { useReactQueryCache } from "@queries/getByIdFromCache";

type GetPatientsPayload = {
  query: {
    page: number;
    limit: number;
    [key: string]: any;
  };
};

export type GetPatientsResponse = {
  results: IPatient[];
  meta: Meta;
};

const getPatients = async ({ query }: GetPatientsPayload) => {
  const { data } = await request({
    method: "GET",
    service: "patient",
    url: "/",
    query,
  });

  return data as GetPatientsResponse;
};

export const useGetPatients = (
  params: GetPatientsPayload["query"],
  enabled = true
) => {
  return useQuery(
    [QueryKeys.Patients.List, params],
    () => getPatients({ query: params }),
    {
      enabled,
      keepPreviousData: true,
    }
  );
};

type GetPatientByIdPayload = {
  params: {
    id: string;
  };
};

type GetPatientByIdResponse = IPatient;

const getPatientById = async ({ params }: GetPatientByIdPayload) => {
  const { data } = await request({
    method: "GET",
    service: "patient",
    url: `/${params.id}`,
  });

  return data as GetPatientByIdResponse;
};

export const useGetPatientById = (
  params: GetPatientByIdPayload["params"],
  enabled = true
) => {
  const { getByIdFromCache } = useReactQueryCache();

  return useQuery(
    [QueryKeys.Patients.ByID, params],
    () => getPatientById({ params }),
    {
      enabled,
      placeholderData: () => {
        return getByIdFromCache<IPatient>(params.id, QueryKeys.Patients.List);
      },
    }
  );
};
