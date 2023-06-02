import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IRole } from "types";
import { ToastError } from "utils/toats";

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
