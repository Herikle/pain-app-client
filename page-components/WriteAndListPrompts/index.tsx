import { Button } from "@components/Button";
import { CustomLoadingButton } from "@components/CustomLoadingButton";
import { Text } from "@components/Text";
import { TextArea } from "@components/TextArea";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { FloppyDisk } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import {
  getAllAttributesFromPrompt,
  promptHasAttributes,
} from "@utils/helpers/prompt";
import styled, { keyframes } from "styled-components";
import {
  CommonKeyBooleanPair,
  CommonKeyStringPair,
  IAttributesConfig,
  IPrompt,
  IPromptOptions,
} from "types";
import { useSavePrompt, useUpdatePrompt } from "@queries/prompt/usePrompt";
import { ListPrompts } from "./components/ListPrompts";
import Router from "next/router";
import { RoutesPath } from "@utils/routes";
import { TokensUsageType } from "@page-components/PromptResponse";
import Image from "next/image";
import { IconsPath } from "@utils/icons";
import { CleanUpUndefined } from "@utils/helpers/object";
import { Portal } from "@components/Portal";

type WriteAndListPromptsProps = {
  prompt: string;
  onChangePrompt: (prompt: string) => void;
  prompts: IPrompt[];
  attributes: { [key: string]: string };
  onChangeAttributes: (attributes: { [key: string]: string }) => void;
  attributesConfig: IAttributesConfig;
  onChangeAttributesConfig: (attributesConfig: IAttributesConfig) => void;
  tokensUsage: TokensUsageType | null;
  options: IPromptOptions;
  prompt_id?: string;
  isMain?: boolean;
  promptHasChanged?: boolean;
  onClickNewPrompt?: () => void;
};

type SavePrompt = {
  attributes?: any;
  attributesConfig?: any;
};

export const WriteAndListPrompts = ({
  prompt,
  onChangePrompt,
  prompts,
  attributes,
  onChangeAttributes,
  attributesConfig,
  onChangeAttributesConfig,
  tokensUsage,
  options,
  prompt_id,
  isMain,
  promptHasChanged,
  onClickNewPrompt,
}: WriteAndListPromptsProps) => {
  const savePrompt = useSavePrompt();

  const hasText = !!prompt;

  const updatePrompt = useUpdatePrompt();

  const createPrompt = async () => {
    const createdPrompt = await savePrompt.mutateAsync({
      body: {
        prompt: prompt,
        attributes: attributes,
        options,
        attributesConfig,
      },
    });
    Router.push(RoutesPath.prompt.replace("[id]", createdPrompt._id));
  };

  const onSavePrompt = async (props?: SavePrompt) => {
    if (prompt_id && promptHasChanged) {
      await updatePrompt.mutateAsync({
        params: {
          prompt_id,
        },
        body: {
          attributes: props?.attributes ?? attributes,
          prompt,
          options,
          attributesConfig: props?.attributesConfig ?? attributesConfig,
        },
      });
    }
  };

  const generateAttributes = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

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
      const currentAttributesConfig = { ...attributesConfig };

      Object.keys(currentAttibutes).forEach((key) => {
        if (!attributesDetected.includes(key)) {
          delete currentAttibutes[key];
          currentAttributesConfig.helperText =
            CleanUpUndefined<CommonKeyStringPair>({
              ...currentAttributesConfig.helperText,
              [key]: undefined,
            });
          currentAttributesConfig.label = CleanUpUndefined<CommonKeyStringPair>(
            {
              ...currentAttributesConfig.label,
              [key]: undefined,
            }
          );

          currentAttributesConfig.placeholder =
            CleanUpUndefined<CommonKeyStringPair>({
              ...currentAttributesConfig.placeholder,
              [key]: undefined,
            });

          currentAttributesConfig.isTextArea =
            CleanUpUndefined<CommonKeyBooleanPair>({
              ...currentAttributesConfig.isTextArea,
              [key]: undefined,
            });
        }
      });

      const updatedAttributes = { ...currentAttibutes, ...newAttributes };

      onChangeAttributes(updatedAttributes);
      onChangeAttributesConfig(currentAttributesConfig);

      onSavePrompt({
        attributes: updatedAttributes,
        attributesConfig: currentAttributesConfig,
      });
    } else {
      onChangeAttributes({});
      const emptyAttributesConfig = {
        helperText: {},
        label: {},
        placeholder: {},
        isTextArea: {},
        isRequired: {},
      };
      onChangeAttributesConfig(emptyAttributesConfig);
      onSavePrompt({
        attributes: {},
        attributesConfig: emptyAttributesConfig,
      });
    }
  };

  return (
    <>
      <UserInteractionContainer>
        <ListPrompts prompts={prompts} onClickNewPrompt={onClickNewPrompt} />
        <WritePromptContainer gap={1}>
          <Text variant="body2Bold">Step 1: Input your prompt</Text>
          <TextArea
            value={prompt}
            onChange={(e) => onChangePrompt(e.target.value)}
            placeholder="Write your prompt..."
            minRows={15}
            maxRows={30}
            onBlur={() => onSavePrompt()}
          />
          <WritePromptBottom>
            <Button
              width="300px"
              disabled={!promptHasAttributes(prompt)}
              onClick={generateAttributes}
            >
              Generate attribute form
            </Button>
            {tokensUsage?.prompt_tokens && (
              <FlexRow>
                <Image
                  src={IconsPath.GPTBlack}
                  alt="ChatGPT Icon"
                  width="22"
                  height="22"
                />
                <Text>
                  Tokens used on this input: {tokensUsage.prompt_tokens}
                </Text>
              </FlexRow>
            )}
            {!prompt_id && (
              <CustomLoadingButton
                icon={<FloppyDisk size={32} color={theme.colors.primary} />}
                loading={savePrompt.isLoading}
                size={32}
                onClick={() => createPrompt()}
                disabled={!hasText}
                tooltip={
                  !hasText
                    ? {
                        text: "Write something to save",
                        id: "write-something-to-save",
                      }
                    : undefined
                }
              />
            )}
          </WritePromptBottom>
        </WritePromptContainer>
      </UserInteractionContainer>
      <Portal>
        {updatePrompt.isLoading && (
          <SavingIconContainer>
            <Disk size={64} color={theme.colors.primary} weight="fill" />
          </SavingIconContainer>
        )}
      </Portal>
    </>
  );
};

const spinning_jumping_animation = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.2);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
`;

const Disk = styled(FloppyDisk)`
  animation: ${spinning_jumping_animation} 1s infinite;
`;

const from_bottom_to_up_animation = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }  
`;

const SavingIconContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  animation: ${from_bottom_to_up_animation} 0.5s ease-in-out;
`;

const WritePromptBottom = styled(FlexRow)`
  justify-content: space-between;
`;

const WritePromptContainer = styled(FlexColumn)`
  width: 100%;
  max-width: 900px;
`;

const UserInteractionContainer = styled(FlexColumn)`
  align-items: flex-start;
  width: 100%;
  gap: 2rem;
  opacity: 1;
`;
