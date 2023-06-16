import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import { BookOpenText, Star } from "@phosphor-icons/react";
import { LightScrollBar, theme } from "@styles/theme";
import styled from "styled-components";
import { IPrompt } from "types";
import { PromptListed } from "./PromptListed";
import { useRouter } from "next/router";
import { AddButton } from "@components/AddButton";
import { Box } from "@mui/material";
import { RoutesPath } from "@utils/routes";

type ListPromptsProps = {
  prompts: IPrompt[];
  onClickNewPrompt?: () => void;
};

export const ListPrompts = ({
  prompts,
  onClickNewPrompt,
}: ListPromptsProps) => {
  const router = useRouter();

  const { id } = router.query as { id: string };

  return (
    <LoadSavedPromptContainer>
      <Text variant="body2Bold">Load a saved prompt</Text>
      <SavedPromptList $hasPrompt={prompts.length > 0}>
        {prompts.length > 0 ? (
          prompts.map((prompt) => (
            <PromptListed
              key={prompt._id}
              prompt={prompt}
              selected={prompt._id === id}
            />
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
      <Box width="100%" display="flex" justifyContent="flex-end">
        {!!onClickNewPrompt ? (
          <AddButton onClick={onClickNewPrompt} />
        ) : (
          <AddButton href={RoutesPath.new_prompt} />
        )}
      </Box>
    </LoadSavedPromptContainer>
  );
};

const LoadSavedPromptContainer = styled(FlexColumn)`
  width: 30%;
  gap: 1rem;
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
