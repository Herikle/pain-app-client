import { FlexColumn } from "@design-components/Flex";
import { Modal } from "../Modal";
import { usePromptOptionsModalState } from "./hook";
import styled from "styled-components";
import { Button } from "@components/Button";
import { useDeletePrompt, useUpdatePrompt } from "@queries/prompt/usePrompt";
import { IPromptOptions } from "types";
import { TextField } from "@components/TextField";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type PromptOptionsModalChildProps = {
  onClose: () => void;
  options: IPromptOptions;
  onUpdateOptions: (options: IPromptOptions) => void;
  prompt_id?: string;
};

const schema = z.object({
  frequency_penalty: z.number().min(-2).max(2).default(0).optional(),
  presence_penalty: z.number().min(-2).max(2).default(0).optional(),
  temperature: z.number().min(0).max(2).default(1).optional(),
  top_p: z.number().min(0).max(2).default(1).optional(),
});

type PromptOptionsFormType = z.infer<typeof schema>;

const Child = ({
  onClose,
  prompt_id,
  options,
  onUpdateOptions,
}: PromptOptionsModalChildProps) => {
  const { handleSubmit, register, formState } = useForm<PromptOptionsFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      frequency_penalty: options.frequency_penalty ?? 0,
      presence_penalty: options.presence_penalty ?? 0,
      temperature: options.temperature ?? 1,
      top_p: options.top_p ?? 1,
    },
  });

  const { errors } = formState;

  const updatePrompt = useUpdatePrompt(false);

  const onSubmit = async (data: PromptOptionsFormType) => {
    onUpdateOptions(data);
    if (prompt_id) {
      updatePrompt.mutateAsync({
        params: {
          prompt_id,
        },
        body: {
          options: data,
        },
      });
    }
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container gap={2}>
          <TextField
            label="Frequency penalty"
            type="number"
            min={-2}
            max={2}
            step={0.1}
            fullWidth
            id="frequency_penalty"
            helperText="Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim. Defaults to 0."
            {...register("frequency_penalty", { valueAsNumber: true })}
            error={errors.frequency_penalty?.message}
          />
          <TextField
            label="Presence penalty"
            type="number"
            min={-2}
            max={2}
            fullWidth
            step={0.1}
            id="presence_penalty"
            helperText="Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics. Defaults to 0."
            {...register("presence_penalty", { valueAsNumber: true })}
            error={errors.presence_penalty?.message}
          />
          <TextField
            label="Temperature"
            type="number"
            min={0}
            max={2}
            fullWidth
            step={0.1}
            id="temperature"
            helperText="What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We generally recommend altering this or top_p but not both. Defaults to 1."
            {...register("temperature", { valueAsNumber: true })}
            error={errors.temperature?.message}
          />
          <TextField
            label="Top p"
            type="number"
            min={0}
            max={2}
            fullWidth
            step={0.1}
            id="top_p"
            helperText="An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. We generally recommend altering this or temperature but not both. Defaults to 1."
            {...register("top_p", { valueAsNumber: true })}
            error={errors.top_p?.message}
          />
          <Button fullWidth>Save</Button>
        </Container>
      </form>
    </Modal>
  );
};

const Container = styled(FlexColumn)`
  align-items: center;
`;

export const PromptOptionsModal = () => {
  const [isOpen, setIsOpen] = usePromptOptionsModalState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} {...isOpen} />;
};
