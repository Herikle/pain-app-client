import { Button } from "@components/Button";
import { CustomLoadingButton } from "@components/CustomLoadingButton";
import { Text } from "@components/Text";
import { TextArea } from "@components/TextArea";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { FloppyDisk, Trash } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import {
  getAllAttributesFromPrompt,
  promptHasAttributes,
} from "@utils/helpers/prompt";
import styled from "styled-components";
import { IPrompt } from "types";
import { useSavePrompt, useUpdatePrompt } from "@queries/prompt/usePrompt";
import { ListPrompts } from "./components/ListPrompts";
import { useSetDeletePromptModal } from "@components/Modals/DeletePromptModal/hook";
import Router from "next/router";
import { RoutesPath } from "@utils/routes";

type WriteAndListPromptsProps = {
  prompt: string;
  onChangePrompt: (prompt: string) => void;
  prompts: IPrompt[];
  attributes: { [key: string]: string };
  onChangeAttributes: (attributes: { [key: string]: string }) => void;
  prompt_id?: string;
  promptHasChanged?: boolean;
};

export const WriteAndListPrompts = ({
  prompt,
  onChangePrompt,
  prompts,
  attributes,
  onChangeAttributes,
  prompt_id,
  promptHasChanged,
}: WriteAndListPromptsProps) => {
  const savePrompt = useSavePrompt();

  const updatePrompt = useUpdatePrompt();

  const openDeletePrompt = useSetDeletePromptModal();

  const onSavePrompt = async () => {
    if (prompt_id) {
      await updatePrompt.mutateAsync({
        params: {
          prompt_id,
        },
        body: {
          attributes,
          prompt,
        },
      });
    } else {
      const createdPrompt = await savePrompt.mutateAsync({
        body: {
          prompt: prompt,
          attributes: attributes,
        },
      });
      Router.push(RoutesPath.prompt.replace("[id]", createdPrompt._id));
    }
  };

  const generateAttributes = () => {
    const attributesDetected = getAllAttributesFromPrompt(prompt);
    if (attributesDetected) {
      const allAttributesKeys = attributesDetected;

      const newAttributes = {};

      allAttributesKeys.forEach((key) => {
        if (!attributes[key]) {
          newAttributes[key] = "";
        }
      });

      const currentAttibutes = { ...attributes };

      Object.keys(currentAttibutes).forEach((key) => {
        if (!attributesDetected.includes(key)) {
          delete currentAttibutes[key];
        }
      });

      onChangeAttributes({
        ...currentAttibutes,
        ...newAttributes,
      });
    } else {
      onChangeAttributes({});
    }
  };

  const onDeleteClick = () => {
    if (prompt_id) {
      openDeletePrompt({
        prompt_id,
      });
    }
  };

  return (
    <UserInteractionContainer>
      <WritePromptContainer gap={1}>
        <Text variant="body2Bold">Step 1: Input your prompt</Text>
        <TextArea
          value={prompt}
          onChange={(e) => onChangePrompt(e.target.value)}
          placeholder="Write your prompt..."
          minRows={15}
        />
        <WritePromptBottom>
          <Button
            width="300px"
            disabled={!promptHasAttributes(prompt)}
            onClick={generateAttributes}
          >
            Generate attribute form
          </Button>
          <FlexRow gap={1.5}>
            {!!prompt_id && (
              <Trash
                size={22}
                cursor="pointer"
                color={theme.colors.text_switched}
                onClick={onDeleteClick}
              />
            )}
            <CustomLoadingButton
              size={22}
              loading={savePrompt.isLoading || updatePrompt.isLoading}
              onClick={onSavePrompt}
              icon={
                promptHasChanged ? (
                  <FloppyDisk
                    size={22}
                    color={theme.colors.primary}
                    weight="fill"
                  />
                ) : (
                  <FloppyDisk size={22} color={theme.colors.text_switched} />
                )
              }
            />
          </FlexRow>
        </WritePromptBottom>
      </WritePromptContainer>
      <ListPrompts prompts={prompts} />
    </UserInteractionContainer>
  );
};

const WritePromptBottom = styled(FlexRow)`
  justify-content: space-between;
`;

const WritePromptContainer = styled(FlexColumn)`
  width: 70%;
`;

const UserInteractionContainer = styled(FlexRow)`
  align-items: flex-start;
  width: 100%;
  gap: 2rem;
  opacity: 1;
`;
