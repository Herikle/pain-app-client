import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IMe, IRole } from "types";
import { ToastError, ToastSuccess } from "utils/toats";

type SetUserRolePayload = {
  body: {
    role: IRole;
  };
};

const setUserRole = async ({ body: { role } }: SetUserRolePayload) => {
  await request({
    service: "account",
    url: "/role",
    method: "PATCH",
    data: { role },
  });

  return true;
};

export const useSetUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation(setUserRole, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.Auth.Me]);
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};

type UpdateAccountPayload = {
  body: {
    name?: string;
  };
};

const updateAccount = async ({ body: { name } }: UpdateAccountPayload) => {
  const { data } = await request({
    service: "account",
    url: "/",
    method: "PATCH",
    data: { name },
  });

  return data as IMe;
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation(updateAccount, {
    onSuccess: (data) => {
      queryClient.setQueryData<IMe>([QueryKeys.Auth.Me], data);
      ToastSuccess("Account updated!");
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};
