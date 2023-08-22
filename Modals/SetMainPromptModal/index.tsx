import { FlexColumn } from "@design-components/Flex";
import { Modal } from "../Modal";
import styled from "styled-components";
import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { useGetMainPromptCreator } from "@queries/prompt/useGetPrompt";
import { useSetMainPromptState } from "./hook";
import { useSetMainPrompt } from "@queries/prompt/usePrompt";
import { useMemo, useState } from "react";
import { LoadingWrapper } from "@components/LoadingWrapper";
import { TextField } from "@components/TextField";

export type SetMainPromptChildProps = {
  onClose: () => void;
  prompt_id: string;
};

const Child = ({ onClose, prompt_id }: SetMainPromptChildProps) => {
  const setMainPrompt = useSetMainPrompt();

  const mainPromptCreator = useGetMainPromptCreator();

  const [confirmationText, setConfirmationText] = useState("");

  const updateAsMainPrompt = async () => {
    await setMainPrompt.mutateAsync({
      params: {
        prompt_id,
      },
    });
    onClose();
  };

  const creator = useMemo(
    () => mainPromptCreator.data,
    [mainPromptCreator.data]
  );

  return (
    <Modal onClose={onClose}>
      <Container gap={2}>
        <Text variant="body2Bold">Are you sure?</Text>
        <LoadingWrapper loading={mainPromptCreator.isLoading}>
          <Text variant="body2" align="center">
            The current main prompt was created by{" "}
            <strong>{creator?.name}</strong>. If you set this prompt as main,
            the current main prompt will be replaced. This will affect the
            public page form.
          </Text>
          <Button
            fullWidth
            loading={setMainPrompt.isLoading}
            onClick={updateAsMainPrompt}
          >
            Set as main
          </Button>
        </LoadingWrapper>
        <Button
          onClick={onClose}
          fullWidth
          color="pure_white"
          textColor="pure_black"
        >
          Cancel
        </Button>
      </Container>
    </Modal>
  );
};

const Container = styled(FlexColumn)`
  align-items: center;
  min-width: 500px;
  max-width: 500px;
`;

export const SetMainPromptModal = () => {
  const [isOpen, setIsOpen] = useSetMainPromptState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} {...isOpen} />;
};
