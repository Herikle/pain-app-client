import { request } from "@queries/request";
import { ToastError } from "@utils/toasts";
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

type ContactForm = {
  body: {
    email: string;
    message: string;
    subject: string;
    recaptchaToken: string;
  };
};

const sendContactForm = async ({ body }: ContactForm) => {
  await request({
    method: "POST",
    service: "public",
    url: "/contact-form",
    data: body,
  });
};

export const useSendContactForm = () => {
  return useMutation(sendContactForm, {
    onError: (err: AxiosError) => {
      ToastError(err);
    },
  });
};
