import { Modal } from "../Modal";
import { useSegmentModalState } from "./hook";
import { SegmentIndex } from "./components/SegmentIndex";
import { ISegment } from "types";

export type CommonSegmentModalProps<T> = {
  onChange: (data: T) => void;
  onValidChange: (valid: boolean) => void;
};

export type SegmentModalChildProps = {
  onClose: () => void;
  segment: ISegment;
  episode_id: string;
};

const Child = ({ onClose, segment, episode_id }: SegmentModalChildProps) => {
  return (
    <Modal onClose={onClose} hasCloseButton>
      <SegmentIndex segment={segment} episode_id={episode_id} />
    </Modal>
  );
};

export const SegmentModal = () => {
  const [isOpen, setIsOpen] = useSegmentModalState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} {...isOpen} />;
};
