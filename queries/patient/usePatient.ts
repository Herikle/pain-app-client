import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IPatient } from "types";

type CreatePatientsPayload = {
  body: {
    name: string;
    birth_date: string;
    about?: string;
  };
};

type CreatePatientResponse = Omit<IPatient, "creator">;

const createPatient = async ({ body }: CreatePatientsPayload) => {
  const { data } = await request({
    service: "patient",
    url: "/",
    method: "POST",
    data: body,
  });

  return data as CreatePatientResponse;
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation(createPatient);
};
