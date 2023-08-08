import { Button } from "@components/Button";
import { CustomLoadingButton } from "@components/CustomLoadingButton";
import { Text } from "@components/Text";
import { TextArea } from "@components/TextArea";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { FloppyDisk, Star } from "@phosphor-icons/react";
import { Inconsolata } from "next/font/google";
import { theme } from "@styles/theme";
import {
  getAllAttributesFromPrompt,
  promptHasAttributes,
} from "@utils/helpers/prompt";
import styled from "styled-components";
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
import { useSetSetMainPrompt } from "@components/Modals/SetMainPromptModal/hook";
import { CleanUpUndefined } from "@utils/helpers/object";

const inconsolata = Inconsolata({ subsets: ["latin"] });

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

  const updatePrompt = useUpdatePrompt();

  const onSavePrompt = async () => {
    if (prompt_id) {
      await updatePrompt.mutateAsync({
        params: {
          prompt_id,
        },
        body: {
          attributes,
          prompt,
          options,
          attributesConfig,
        },
      });
    } else {
      const createdPrompt = await savePrompt.mutateAsync({
        body: {
          prompt: prompt,
          attributes: attributes,
          options,
          attributesConfig,
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

      onChangeAttributes({
        ...currentAttibutes,
        ...newAttributes,
      });

      onChangeAttributesConfig(currentAttributesConfig);
    } else {
      onChangeAttributes({});
    }
  };

  return (
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
            <FlexRow>
              <Image
                src={IconsPath.GPTBlack}
                alt="ChatGPT Icon"
                width="22"
                height="22"
              />
              <Text fontFamily={inconsolata}>
                Tokens used on this input: {tokensUsage?.prompt_tokens ?? 0}
              </Text>
            </FlexRow>
            <CustomLoadingButton
              size={22}
              tooltip={{
                text: "Save",
                id: "save-prompt",
              }}
              loading={savePrompt.isLoading || updatePrompt.isLoading}
              onClick={onSavePrompt}
              disabled={!prompt}
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
    </UserInteractionContainer>
  );
};

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
