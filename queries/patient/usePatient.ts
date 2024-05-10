import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { ToastError, ToastSuccess } from "@utils/toasts";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IPatient } from "types";
import { useUpdatePatientOnCache } from "./hooks/useUpdatePatientOnCache";
import { useUpdatePatientsSuggestionOnCache } from "./hooks/useUpdateSuggestionOnCache";
import { useUpdateBookmarksOnCache } from "@queries/bookmark-patients/hooks/useUpdateBookmarkOnCache";

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

const createPatient = async () => {
  const { data } = await request({
    service: "patient",
    url: "/",
    method: "POST",
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
    birth_date?: string | null;
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

  const { updatePatientByIdOnCache } = useUpdatePatientOnCache();

  return useMutation(updatePatient, {
    onMutate: async ({ params, body }) => {
      updatePatientByIdOnCache(params.patient_id, {
        ...body,
        birth_date: body.birth_date ?? undefined,
      });
    },
    onSuccess: () => {
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
  const { deletePatientOnCache } = useUpdatePatientOnCache();
  return useMutation(deletePatient, {
    onSuccess: (_, { params }) => {
      deletePatientOnCache({
        id: params.patient_id,
      });

      queryClient.invalidateQueries(QueryKeys.Patients.ByID);
      queryClient.invalidateQueries(QueryKeys.Patients.List);
      ToastSuccess("Patient deleted successfully");
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};

type AddToBookMarkParams = {
  body: {
    patient_id: string;
  };
};

const addToBookmark = async ({ body }: AddToBookMarkParams) => {
  const { data } = await request({
    service: "patient",
    url: "/bookmark",
    method: "POST",
    data: body,
  });

  return data as IPatient;
};

export const useAddPatientToBookmark = () => {
  const queryClient = useQueryClient();

  const { deleteSuggestionFromCache } = useUpdatePatientsSuggestionOnCache();

  return useMutation(addToBookmark, {
    onSuccess: (_, { body }) => {
      ToastSuccess("Patient added to bookmark");
      deleteSuggestionFromCache(body.patient_id);
      queryClient.invalidateQueries([QueryKeys.BookmarkPatients.List]);
      queryClient.invalidateQueries([QueryKeys.Patients.List]);
      queryClient.invalidateQueries([QueryKeys.Patients.SuggestionList]);
    },
  });
};

type RemoveFromBookMarkParams = {
  body: {
    patient_id: string;
  };
};

const removeFromBookmark = async ({ body }: RemoveFromBookMarkParams) => {
  const { data } = await request({
    service: "patient",
    url: "/bookmark",
    method: "DELETE",
    data: body,
  });

  return data as IPatient;
};

export const useRemovePatientFromBookmark = () => {
  const queryClient = useQueryClient();

  const { deleteBookmarkFromCache } = useUpdateBookmarksOnCache();

  return useMutation(removeFromBookmark, {
    onSuccess: (_, { body }) => {
      ToastSuccess("Patient removed from bookmark");
      deleteBookmarkFromCache(body.patient_id);
      queryClient.invalidateQueries([QueryKeys.BookmarkPatients.List]);
      queryClient.invalidateQueries([QueryKeys.Patients.List]);
      queryClient.invalidateQueries([QueryKeys.Patients.SuggestionList]);
    },
  });
};
