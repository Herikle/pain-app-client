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
  discussion_path: {
    patient_id: string;
    breadcrumb: string[];
    episode_id: string | null;
    track_id: string | null;
    segment_id: string | null;
  };
};

const Child = ({ onClose, discussion_path }: DiscussionModalProps) => {
  return (
    <Modal onClose={onClose} hasCloseButton fullScreenOnMobile>
      <Container>
        <Discussion discussion_path={discussion_path} />
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
