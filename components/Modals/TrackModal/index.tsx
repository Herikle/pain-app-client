import { Modal } from "../Modal";
import { TrackIndex } from "./components/TrackIndex";
import { useTrackModalState } from "./hook";

export type TrackModalChildProps = {
  onClose: () => void;
};

const Child = ({ onClose }: TrackModalChildProps) => {
  return (
    <Modal onClose={onClose} hasCloseButton>
      <TrackIndex />
    </Modal>
  );
};

export const TrackModal = () => {
  const [isOpen, setIsOpen] = useTrackModalState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} {...isOpen} />;
};
