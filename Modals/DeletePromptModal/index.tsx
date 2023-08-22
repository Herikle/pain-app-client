import { FlexColumn } from "@design-components/Flex";
import { useDeletePromptModalState } from "./hook";
import styled from "styled-components";
import { useDeletePrompt } from "@queries/prompt/usePrompt";
import Router, { useRouter } from "next/router";
import { RoutesPath } from "@utils/routes";
import { ConfirmActionModal } from "../ConfirmActionModal";

export type DeletePromptModalProps = {
  onClose: () => void;
  prompt_id: string;
};

const Child = ({ onClose, prompt_id }: DeletePromptModalProps) => {
  const deletePrompt = useDeletePrompt();

  const { query } = useRouter();
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
    <ConfirmActionModal
      onClose={onClose}
      onConfirm={onConfirm}
      description="Once you delete it, these data won't be recovered."
      confirmText="Yes, delete it"
      loading={deletePrompt.isLoading}
    />
  );
};

export const DeletePromptModal = () => {
  const [isOpen, setIsOpen] = useDeletePromptModalState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} prompt_id={isOpen.prompt_id} />;
};
