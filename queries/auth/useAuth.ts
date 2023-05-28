import { useMutation, useQueryClient } from "react-query";
import { request } from "@queries/request";
import { IMe } from "types";
import { QueryKeys } from "@queries/keys";
import { storeToken } from "utils/localStorage/token";

type SignUpResponse = {
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

  return data as SignUpResponse;
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation(signUp, {
    onSuccess: (data) => {
      storeToken(data.token);
      queryClient.invalidateQueries([QueryKeys.Auth.Me]);
    },
  });
};
