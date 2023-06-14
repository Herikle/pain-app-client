import { FlexColumn } from "@design-components/Flex";
import { Modal } from "../Modal";
import { useChangedPromptWarningModalState } from "./hook";
import styled from "styled-components";
import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { useUpdatePrompt } from "@queries/prompt/usePrompt";
import { IPrompt } from "types";

export type ChildPropsChangedPromptWarningModal = {
  prompt_id: string;
  dataNotSaved: Partial<IPrompt>;
  afterSave?: () => void;
  onCancel?: () => void;
  onClose: () => void;
};

const Child = ({
  onClose,
  prompt_id,
  dataNotSaved,
  afterSave,
  onCancel,
}: ChildPropsChangedPromptWarningModal) => {
  const updatePrompt = useUpdatePrompt();

  const onConfirm = async () => {
    await updatePrompt.mutateAsync({
      params: {
        prompt_id,
      },
      body: dataNotSaved,
    });
    afterSave?.();
    onClose();
  };

  const clickCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <Container gap={2}>
        <Text variant="body2Bold">You prompt have changed</Text>
        <Text variant="body2">
          Do you want to save the changes before leaving?
        </Text>
        <Button fullWidth onClick={onConfirm} loading={updatePrompt.isLoading}>
          Yes, save it
        </Button>
        <Button
          onClick={clickCancel}
          fullWidth
          color="pure_white"
          textColor="pure_black"
        >
          No, do not save
        </Button>
      </Container>
    </Modal>
  );
};

const Container = styled(FlexColumn)`
  align-items: center;
`;

export const ChangedPromptWarningModal = () => {
  const [isOpen, setIsOpen] = useChangedPromptWarningModalState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} {...isOpen} />;
};
