import { useMutation, useQueryClient } from "react-query";
import { request } from "@queries/request";
import { IMe } from "types";
import { QueryKeys } from "@queries/keys";
import { storeToken } from "utils/localStorage/token";
import { AxiosError } from "axios";
import { ToastError } from "utils/toats";

type AuthenticatedResponse = {
  user: IMe;
  token: string;
};

type SignUpPayload = {
  body: {
    name: string;
    email: string;
    password: string;
  };
};

const signUp = async ({ body }: SignUpPayload) => {
  const { data } = await request({
    method: "POST",
    service: "auth",
    url: "/register",
    data: body,
  });

  return data as AuthenticatedResponse;
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation(signUp, {
    onSuccess: (data) => {
      storeToken(data.token);
      queryClient.invalidateQueries([QueryKeys.Auth.Me]);
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};

type LogInPayload = {
  body: {
    email: string;
    password: string;
  };
};

const logIn = async ({ body }: LogInPayload) => {
  const { data } = await request({
    method: "POST",
    service: "auth",
    url: "/login",
    data: body,
  });

  return data as AuthenticatedResponse;
};

export const useLogIn = () => {
  const queryClient = useQueryClient();
  return useMutation(logIn, {
    onSuccess: (data) => {
      storeToken(data.token);
      queryClient.invalidateQueries([QueryKeys.Auth.Me]);
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};
