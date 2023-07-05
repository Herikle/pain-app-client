import { FlexColumn } from "@design-components/Flex";
import { Modal } from "../Modal";
import { useSegmentModalState } from "./hook";
import styled from "styled-components";
import { SegmentIndex } from "./components/SegmentIndex";

export type SegmentModalChildProps = {
  onClose: () => void;
  segment: any;
};

const Child = ({ onClose, segment }: SegmentModalChildProps) => {
  return (
    <Modal onClose={onClose} hasCloseButton>
      <SegmentIndex />
    </Modal>
  );
};

export const SegmentModal = () => {
  const [isOpen, setIsOpen] = useSegmentModalState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} {...isOpen} />;
};
