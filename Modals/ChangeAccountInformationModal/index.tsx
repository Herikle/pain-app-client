import { FlexColumn, FlexRow } from "@design-components/Flex";
import { Modal } from "../Modal";
import { useChangeAccountInformationModalState } from "./hook";
import styled from "styled-components";
import { AccountForm } from "@page-components/AccountForm";
import { media } from "@styles/media-query";

export type ChildPropsChangeAccountInformationModal = {
  onClose: () => void;
};

const Child = ({ onClose }: ChildPropsChangeAccountInformationModal) => {
  return (
    <Modal onClose={onClose} hasCloseButton>
      <Container>
        <AccountForm />
      </Container>
    </Modal>
  );
};

const Container = styled(FlexColumn)`
  align-items: flex-start;
  width: 700px;

  ${media.up.tablet`
    width: 100%; 
    min-width: 70vw;
  `}
`;

export const ChangeAccountInformationModal = () => {
  const [isOpen, setIsOpen] = useChangeAccountInformationModalState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} {...isOpen} />;
};