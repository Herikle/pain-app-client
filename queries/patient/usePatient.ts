import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { ToastError, ToastSuccess } from "@utils/toats";
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

type UpdatePatientPayload = {
  params: {
    patient_id: string;
  };
  body: {
    name?: string;
    birth_date?: string;
    about?: string;
  };
};

type UpdatePatientResponse = Omit<IPatient, "creator">;

const updatePatient = async ({ params, body }: UpdatePatientPayload) => {
  const { data } = await request({
    service: "patient",
    url: `/${params.patient_id}`,
    method: "PATCH",
    data: body,
  });

  return data as UpdatePatientResponse;
};

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation(updatePatient, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.Patients.ByID);
      queryClient.invalidateQueries(QueryKeys.Patients.List);
      ToastSuccess("Patient updated successfully");
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};
