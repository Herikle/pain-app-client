import { request } from "@queries/request";
import { ToastError } from "@utils/toats";
import { AxiosError } from "axios";
import { useMutation } from "react-query";

type GeneratePromptPayload = {
  body: {
    attributes: any;
    recaptchaToken: string;
  };
};

const generateResponse = async ({ body }: GeneratePromptPayload) => {
  const response = await request({
    method: "POST",
    service: "public",
    url: "/generate",
    data: body,
    responseType: "stream",
  });

  return response;
};

export const useGenerateResponse = () => {
  return useMutation(generateResponse, {
    onError: (err: AxiosError) => {
      ToastError(err);
    },
  });
};
