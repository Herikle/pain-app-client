import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import { Star } from "@phosphor-icons/react";
import { LightScrollBar, theme } from "@styles/theme";
import styled from "styled-components";
import { IPrompt } from "types";
import { PromptListed } from "./PromptListed";

type ListPromptsProps = {
  prompts: IPrompt[];
};

export const ListPrompts = ({ prompts }: ListPromptsProps) => {
  return (
    <LoadSavedPromptContainer>
      <Text variant="body2Bold">Load a saved prompt</Text>
      <SavedPromptList $hasPrompt={prompts.length > 0}>
        {prompts.length > 0 ? (
          prompts.map((prompt) => (
            <PromptListed key={prompt._id} prompt={prompt} />
          ))
        ) : (
          <Text align="center">
            {"You don't have any saved prompts. Press"}{" "}
            <Star
              size={16}
              cursor="pointer "
              color={theme.colors.text_switched}
            />{" "}
            {"to save a prompt you write."}
          </Text>
        )}
      </SavedPromptList>
    </LoadSavedPromptContainer>
  );
};

const LoadSavedPromptContainer = styled(FlexColumn)`
  width: 30%;
`;

type SavedPromptlistProps = {
  $hasPrompt: boolean;
};

const SavedPromptList = styled(FlexColumn)<SavedPromptlistProps>`
  height: 265px;
  justify-content: ${({ $hasPrompt }) =>
    $hasPrompt ? "flex-start" : "center"};
  overflow: auto;
  padding-block: 0.5rem;
  ${LightScrollBar};
`;
