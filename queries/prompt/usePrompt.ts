import { QueryKeys } from "@queries/keys";
import { request } from "@queries/request";
import { ToastError, ToastSuccess } from "@utils/toats";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IAttributesConfig, IPrompt, IPromptOptions } from "types";

type GeneratePromptPayload = {
  body: {
    prompt: string;
    options: IPromptOptions;
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
    attributesConfig: IAttributesConfig;
    options: IPromptOptions;
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
      ToastSuccess("Prompt saved successfully");
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
    attributesConfig?: IAttributesConfig;
    title?: string;
    options?: IPromptOptions;
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

export const useUpdatePrompt = (invalidate = true) => {
  const queryClient = useQueryClient();

  return useMutation(updatePrompt, {
    onSuccess: () => {
      if (invalidate) {
        queryClient.invalidateQueries([QueryKeys.Prompt.List]);
        queryClient.invalidateQueries([QueryKeys.Prompt.ByID]);
      }
      // ToastSuccess("Prompt updated successfully");
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};

type SetMainPromptPayload = {
  params: {
    prompt_id: string;
  };
};

const setMainPrompt = async ({ params }: SetMainPromptPayload) => {
  const { data } = await request({
    method: "PATCH",
    service: "prompt",
    url: `${params.prompt_id}/main`,
  });

  return data as IPrompt;
};

export const useSetMainPrompt = () => {
  const queryClient = useQueryClient();

  return useMutation(setMainPrompt, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.Prompt.ByID]);
      ToastSuccess("This prompt is now the main prompt");
    },
    onError: (error: AxiosError) => {
      ToastError(error);
    },
  });
};
