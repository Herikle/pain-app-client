import { FlexColumn } from "@design-components/Flex";
import { Modal } from "../Modal";
import styled from "styled-components";
import { Text } from "@components/Text";
import { Button } from "@components/Button";
import React, { useState } from "react";
import { TextField } from "@components/TextField";

type ConfirmActionModalProps = {
  onConfirm: (confirmationText?: string) => void;
  onClose: () => void;
  description: React.ReactNode;
  writeConfirmation?: {
    label: React.ReactNode;
    testText: string;
  };
  title?: React.ReactNode;
  loading?: boolean;
  confirmText?: string;
  cancelText?: React.ReactNode;
  hasCloseButton?: boolean;
  onCancel?: () => void;
};

export const ConfirmActionModal = ({
  onConfirm,
  onClose,
  description,
  writeConfirmation,
  title = "Are you sure?",
  loading = false,
  confirmText = "Yes, confirm",
  cancelText = "No, I want to go back",
  hasCloseButton = false,
  onCancel,
}: ConfirmActionModalProps) => {
  const [confirmationText, setConfirmationText] = useState("");

  const confirm = () => {
    onConfirm(writeConfirmation ? confirmationText : undefined);
  };

  const isValid = writeConfirmation?.testText === confirmationText;

  return (
    <Modal onClose={onClose} hasCloseButton={hasCloseButton}>
      <Container gap={2}>
        {title && <Text variant="body2Bold">{title}</Text>}
        {description && <Text variant="body2">{description}</Text>}
        {writeConfirmation && (
          <>
            <Text variant="body2">{writeConfirmation.label}</Text>
            <TextField
              fullWidth
              label="Type here"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              helperText="Respect case sensitive: 'A' is different from 'a'"
              id="confirmation-text"
            />
          </>
        )}
        <Button
          fullWidth
          onClick={confirm}
          loading={loading}
          disabled={writeConfirmation && !isValid}
        >
          {confirmText}
        </Button>
        <Button
          onClick={onCancel ?? onClose}
          fullWidth
          color="pure_white"
          textColor="pure_black"
        >
          {cancelText}
        </Button>
      </Container>
    </Modal>
  );
};

const Container = styled(FlexColumn)`
  align-items: center;
  max-width: 500px;
`;
