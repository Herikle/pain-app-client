import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { BookOpenText, FilePlus, Star } from "@phosphor-icons/react";
import { LightScrollBar, theme } from "@styles/theme";
import styled from "styled-components";
import { IPrompt } from "types";
import { PromptListed } from "./PromptListed";
import { useRouter } from "next/router";
import { AddButton } from "@components/AddButton";
import { Box } from "@mui/material";
import { RoutesPath } from "@utils/routes";
import { useSetSetMainPrompt } from "@components/Modals/SetMainPromptModal/hook";
import Link from "next/link";

type ListPromptsProps = {
  prompts: IPrompt[];
  onClickNewPrompt?: () => void;
};

export const ListPrompts = ({
  prompts,
  onClickNewPrompt,
}: ListPromptsProps) => {
  const router = useRouter();

  const setMainPromptModal = useSetSetMainPrompt();

  const { id } = router.query as { id: string };

  const onPublish = (prompt_id: string) => {
    setMainPromptModal({
      prompt_id,
    });
  };

  const renderAddButton = (children: React.ReactNode) => {
    if (!!onClickNewPrompt) {
      return children;
    }

    return (
      <Link
        style={{
          width: "fit-content",
        }}
        href={RoutesPath.new_prompt}
      >
        {children}
      </Link>
    );
  };

  return (
    <LoadSavedPromptContainer>
      {renderAddButton(
        <FlexRow
          justify="flex-start"
          mb={2}
          onClick={onClickNewPrompt}
          width="fit-content"
          height="fit-content"
          style={{
            cursor: "pointer",
          }}
        >
          <Text variant="body2Bold" color="text_switched">
            Create a new prompt
          </Text>
          <FilePlus size={22} color={theme.colors.text_switched} />
        </FlexRow>
      )}

      <Text variant="body2Bold">Load a saved prompt</Text>
      <SavedPromptList $hasPrompt={prompts.length > 0}>
        {prompts.length > 0 ? (
          prompts.map((prompt) => (
            <PromptListed
              key={prompt._id}
              prompt={prompt}
              selected={prompt._id === id}
              onPublishClick={onPublish}
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
    </LoadSavedPromptContainer>
  );
};

const LoadSavedPromptContainer = styled(FlexColumn)`
  width: 100%;
  max-width: 900px;
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
  padding-inline-end: 1rem;
  ${LightScrollBar};
`;
