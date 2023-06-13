import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { ToastError } from "@utils/toats";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IPrompt } from "types";

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

  return data as IPrompt;
};

export const useSavePrompt = () => {
  const queryClient = useQueryClient();

  return useMutation(savePrompt, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.Prompt.List]);
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};

type DeleteModalProps = {
  params: {
    prompt_id: string;
  };
};

const deletePrompt = async ({ params }: DeleteModalProps) => {
  const { data } = await request({
    method: "DELETE",
    service: "prompt",
    url: `/${params.prompt_id}`,
  });

  return data;
};

export const useDeletePrompt = () => {
  const queryClient = useQueryClient();

  return useMutation(deletePrompt, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.Prompt.List]);
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};

type UpdatePromptPayload = {
  params: {
    prompt_id: string;
  };
  body: {
    prompt?: string;
    attributes?: any;
    title?: string;
  };
};

const updatePrompt = async ({ body, params }: UpdatePromptPayload) => {
  const { data } = await request({
    method: "PATCH",
    service: "prompt",
    url: `/${params.prompt_id}`,
    data: body,
  });

  return data as IPrompt;
};

export const useUpdatePrompt = () => {
  const queryClient = useQueryClient();

  return useMutation(updatePrompt, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.Prompt.List]);
      queryClient.invalidateQueries([QueryKeys.Prompt.ByID]);
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};
