import { ITrack } from "types";
import { Modal } from "../Modal";
import { TrackIndex } from "./components/TrackIndex";
import { useTrackModalState } from "./hook";

export type TrackModalChildProps = {
  onClose: () => void;
  track: ITrack;
};

const Child = ({ onClose, track }: TrackModalChildProps) => {
  return (
    <Modal onClose={onClose} hasCloseButton>
      <TrackIndex track={track} />
    </Modal>
  );
};

export const TrackModal = () => {
  const [isOpen, setIsOpen] = useTrackModalState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} {...isOpen} />;
};
