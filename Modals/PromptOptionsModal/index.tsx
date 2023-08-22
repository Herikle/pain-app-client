import { FlexColumn, FlexRow } from "@design-components/Flex";
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
import { Text } from "@components/Text";
import { Gear } from "@phosphor-icons/react";
import { theme } from "@styles/theme";

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
  const { handleSubmit, register, formState, watch } =
    useForm<PromptOptionsFormType>({
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
    <Modal onClose={onClose} hasCloseButton>
      <FlexRow justify="flex-start">
        <Gear size={16} color={theme.colors.pure_black} />
        <Text variant="body1Bold">Prompt settings</Text>
      </FlexRow>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container gap={1.5} mt={2}>
          <FlexColumn width="100%" align="center">
            <TextField
              noPadding
              label="Frequency penalty"
              type="range"
              min={-2}
              max={2}
              step={0.1}
              fullWidth
              id="frequency_penalty"
              helperText="Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim. Defaults to 0."
              {...register("frequency_penalty", { valueAsNumber: true })}
              error={errors.frequency_penalty?.message}
            />
            <Text mt={0.5}>{watch("frequency_penalty")}</Text>
            <FlexRow justify="space-between" mt={0.5} width="100%">
              <Text>
                Less varied <br /> output
              </Text>
              <Text>Default</Text>
              <Text>
                More varied <br /> output
              </Text>
            </FlexRow>
          </FlexColumn>
          <FlexColumn width="100%" align="center">
            <TextField
              noPadding
              label="Presence penalty"
              type="range"
              min={-2}
              max={2}
              fullWidth
              step={0.1}
              id="presence_penalty"
              helperText="Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics. Defaults to 0."
              {...register("presence_penalty", { valueAsNumber: true })}
              error={errors.presence_penalty?.message}
            />
            <Text mt={0.5}>{watch("presence_penalty")}</Text>
            <FlexRow justify="space-between" mt={0.5} width="100%">
              <Text>
                More informal <br /> output
              </Text>
              <Text>Default</Text>
              <Text>
                More formal <br /> output
              </Text>
            </FlexRow>
          </FlexColumn>
          <FlexColumn width="100%" align="center">
            <TextField
              noPadding
              label="Temperature"
              type="range"
              min={0}
              max={2}
              fullWidth
              step={0.1}
              id="temperature"
              helperText="What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We generally recommend altering this or top_p but not both. Defaults to 1."
              {...register("temperature", { valueAsNumber: true })}
              error={errors.temperature?.message}
            />
            <Text mt={0.5}>{watch("temperature")}</Text>
            <FlexRow justify="space-between" mt={0.5} width="100%">
              <Text>
                More focused <br /> output
              </Text>
              <Text>Default</Text>
              <Text>
                More creative <br /> output
              </Text>
            </FlexRow>
          </FlexColumn>
          <FlexColumn width="100%" align="center">
            <TextField
              noPadding
              label="Top p"
              type="range"
              min={0}
              max={2}
              fullWidth
              step={0.1}
              id="top_p"
              helperText="An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. We generally recommend altering this or temperature but not both. Defaults to 1."
              {...register("top_p", { valueAsNumber: true })}
              error={errors.top_p?.message}
            />
            <Text mt={0.5}>{watch("top_p")}</Text>
            <FlexRow justify="space-between" mt={0.5} width="100%">
              <Text>
                Less options <br /> of words
              </Text>
              <Text>Default</Text>
              <Text>
                More options <br /> of words
              </Text>
            </FlexRow>
          </FlexColumn>
          <Button fullWidth>Save</Button>
        </Container>
      </form>
    </Modal>
  );
};

const Container = styled(FlexColumn)`
  align-items: center;
  width: 500px;
`;

export const PromptOptionsModal = () => {
  const [isOpen, setIsOpen] = usePromptOptionsModalState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} {...isOpen} />;
};
