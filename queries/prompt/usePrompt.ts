import { request } from "@queries/request";
import { useMutation } from "react-query";

type GeneratePromptPayload = {
  body: {
    prompt: string;
  };
};

type GeneratePromptResponse = {
  response: string;
  prompt_tokens: number;
  response_tokens: number;
  total: number;
};

const generateCompletion = async ({ body }: GeneratePromptPayload) => {
  const { data } = await request({
    method: "POST",
    service: "prompt",
    url: "/generate",
    data: body,
  });

  return data as GeneratePromptResponse;
};

export const useGenerateCompletion = () => {
  return useMutation(generateCompletion);
};

type SavePromptPayload = {
  body: {
    prompt: string;
    attributes: any;
  };
};

const savePrompt = async ({ body }: SavePromptPayload) => {
  const { data } = await request({
    method: "POST",
    service: "prompt",
    data: body,
  });

  return data;
};

export const useSavePrompt = () => {
  return useMutation(savePrompt);
};
