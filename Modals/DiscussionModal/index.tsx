import { FlexColumn } from "@design-components/Flex";
import { useDiscussionModalState } from "./hook";
import styled from "styled-components";
import { useDeletePrompt } from "@queries/prompt/usePrompt";
import Router, { useRouter } from "next/router";
import { RoutesPath } from "@utils/routes";
import { ConfirmActionModal } from "../ConfirmActionModal";
import { Modal } from "@Modals/Modal";
import { Discussion } from "@components/Discussion";

export type DiscussionModalProps = {
  onClose: () => void;
  episode_id: string;
};

const Child = ({ onClose, episode_id }: DiscussionModalProps) => {
  return (
    <Modal onClose={onClose} hasCloseButton fullScreenOnMobile>
      <Container>
        <Discussion episode_id={episode_id} />
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  width: 800px;
  height: 600px;
`;

export const DiscussionModalWrapper = () => {
  const [discussionProps, setDiscussionProps] = useDiscussionModalState();

  if (!discussionProps) return null;

  return (
    <Child onClose={() => setDiscussionProps(null)} {...discussionProps} />
  );
};
