import { useMutation, useQueryClient } from "react-query";
import { request } from "@queries/request";
import { IMe } from "types";
import { QueryKeys } from "@queries/keys";
import { storeToken } from "utils/localStorage/token";
import { AxiosError } from "axios";
import { StyledToastError, ToastError } from "@utils/toasts";

type AuthenticatedResponse = {
  user: IMe;
  token: string;
};

export type SignUpPayload = {
  body: {
    name: string;
    email: string;
    password: string;
    episode_id?: string;
  };
};

export const signUp = async ({ body }: SignUpPayload) => {
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

export type LogInPayload = {
  body: {
    email: string;
    password: string;
    episode_id?: string;
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
      const status = error.response?.status;
      if (status === 401) {
        StyledToastError("Invalid email or password");
      } else {
        ToastError(error);
      }
    },
  });
};

type GetUrlResponse = {
  url: string;
};

const getGoogleOAuthUrl = async () => {
  const { data } = await request({
    method: "GET",
    service: "auth",
    url: "/google/oauth",
  });

  return data as GetUrlResponse;
};

export const useGetGoogleOAuthUrl = () => {
  return useMutation(getGoogleOAuthUrl, {
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};

type GoogleOAuthPayload = {
  body: {
    code: string;
    episode_id?: string;
  };
};

const googleOAuth = async ({ body }: GoogleOAuthPayload) => {
  const { data } = await request({
    method: "POST",
    service: "auth",
    url: "/google/oauth",
    data: body,
  });

  return data as AuthenticatedResponse;
};

export const useGoogleOAuth = () => {
  const queryClient = useQueryClient();
  return useMutation(googleOAuth, {
    onSuccess: (data) => {
      storeToken(data.token);
      queryClient.invalidateQueries([QueryKeys.Auth.Me]);
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};
