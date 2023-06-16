import { FlexColumn } from "@design-components/Flex";
import { Modal } from "../Modal";
import { useDeletePromptModalState } from "./hook";
import styled from "styled-components";
import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { useDeletePrompt } from "@queries/prompt/usePrompt";
import Router, { useRouter } from "next/router";
import { RoutesPath } from "@utils/routes";

type ChildProps = {
  onClose: () => void;
  prompt_id: string;
};

const Child = ({ onClose, prompt_id }: ChildProps) => {
  const deletePrompt = useDeletePrompt();

  const { pathname, query } = useRouter();
  const onConfirm = async () => {
    await deletePrompt.mutateAsync({
      params: {
        prompt_id,
      },
    });
    onClose();
    const id = query.id;
    if (id === prompt_id) {
      Router.replace(RoutesPath.new_prompt);
    }
  };

  return (
    <Modal onClose={onClose}>
      <Container gap={2}>
        <Text variant="body2Bold">Are you sure?</Text>
        <Text variant="body2">
          {"Once you delete it, these data won't be recovered."}
        </Text>
        <Button fullWidth onClick={onConfirm} loading={deletePrompt.isLoading}>
          Yes, delete it
        </Button>
        <Button
          onClick={onClose}
          fullWidth
          color="pure_white"
          textColor="pure_black"
        >
          No, I want to go back
        </Button>
      </Container>
    </Modal>
  );
};

const Container = styled(FlexColumn)`
  align-items: center;
`;

export const DeletePromptModal = () => {
  const [isOpen, setIsOpen] = useDeletePromptModalState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} prompt_id={isOpen.prompt_id} />;
};
