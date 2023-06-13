import { useSetDeletePromptModal } from "@components/Modals/DeletePromptModal/hook";
import { Text } from "@components/Text";
import { FlexRow } from "@design-components/Flex";
import { PencilSimpleLine, Trash } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import { RoutesPath } from "@utils/routes";
import Link from "next/link";
import styled from "styled-components";
import { IPrompt } from "types";

type PromptListedProps = {
  prompt: IPrompt;
};

export const PromptListed = ({ prompt }: PromptListedProps) => {
  const setDeleteModal = useSetDeletePromptModal();

  const onDelete = () => {
    setDeleteModal({
      prompt_id: prompt._id,
    });
  };

  return (
    <Container>
      <Link href={RoutesPath.prompt.replace("[id]", prompt._id)}>
        <Text color="text_switched">{prompt.title}</Text>
      </Link>
      <FlexRow gap={1.5}>
        <PencilSimpleLine
          color={theme.colors.text_switched}
          size={16}
          cursor="pointer"
          onClick={() => alert("Not implemented yet.")}
        />
        <Trash
          color={theme.colors.text_switched}
          size={16}
          cursor="pointer"
          onClick={onDelete}
        />
      </FlexRow>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
