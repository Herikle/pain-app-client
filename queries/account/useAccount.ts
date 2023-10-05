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

type UpdatePasswordAccountPaylod = {
  body: {
    current_password: string;
    new_password: string;
    confirm_password: string;
  };
};

const updatePasswordAccount = async ({ body }: UpdatePasswordAccountPaylod) => {
  await request({
    service: "account",
    url: "/password",
    method: "PATCH",
    data: body,
  });

  return true;
};

export const useUpdatePasswordAccount = () => {
  return useMutation(updatePasswordAccount, {
    onSuccess: () => {
      ToastSuccess("Password updated!");
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};

type RecoveryPasswordParams = {
  email: string;
};

const recoveryPassword = async (params: RecoveryPasswordParams) => {
  await request({
    service: "account",
    url: "/recovery-password",
    method: "POST",
    data: params,
  });

  return true;
};

export const useRecoveryPassword = () => {
  return useMutation(recoveryPassword, {
    onSuccess: () => {
      ToastSuccess("Recovery password sent!");
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};

type ResetPasswordParams = {
  body: {
    password: string;
    password_confirm: string;
    token: string;
  };
};

const resetPassword = async ({ body }: ResetPasswordParams) => {
  await request({
    service: "account",
    url: "/reset-password",
    method: "PATCH",
    data: body,
  });

  return true;
};

export const useResetPassword = () => {
  return useMutation(resetPassword, {
    onSuccess: () => {
      ToastSuccess("Password reseted!");
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};
