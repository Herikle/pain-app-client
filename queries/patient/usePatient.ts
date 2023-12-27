import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { ToastError, ToastSuccess } from "@utils/toasts";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IPatient } from "types";

type CreatePatientsPayload = {
  body: {
    name: string;
    type: IPatient["type"];
    location?: string;
    common_name?: string;
    scientific_name?: string;
    birth_date?: Date;
    production_system?: string;
    life_fate?: string;
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
  return useMutation(createPatient);
};

type UpdatePatientPayload = {
  params: {
    patient_id: string;
  };
  body: {
    name?: string;
    birth_date?: Date;
    type?: IPatient["type"];
    production_system?: string;
    life_fate?: string;
    about?: string;
    location?: string;
    common_name?: string;
    scientific_name?: string;
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
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};

type DeletePatientPayload = {
  params: {
    patient_id: string;
  };
};

const deletePatient = async ({ params }: DeletePatientPayload) => {
  const { data } = await request({
    service: "patient",
    url: `/${params.patient_id}`,
    method: "DELETE",
  });

  return data;
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();

  return useMutation(deletePatient, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.Patients.ByID);
      queryClient.invalidateQueries(QueryKeys.Patients.List);
      ToastSuccess("Patient deleted successfully");
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};
