import { useMutation } from "react-query";
import { request } from "@queries/request";

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

  return data;
};

export const useSignUp = () => {
  return useMutation(signUp);
};
