import { ITrack } from "types";
import { Modal } from "../Modal";
import { TrackIndex } from "./components/TrackIndex";
import { useTrackModalState } from "./hook";

type TrackItemModal = {
  name: string;
  _id: string;
  pain_type: "psychological" | "physical";
  comment?: string;
};

export type TrackModalChildProps = {
  onClose: () => void;
  track: TrackItemModal;
};

const Child = ({ onClose, track }: TrackModalChildProps) => {
  return (
    <Modal
      removePadding
      fullScreenOnMobile
      removeOverlay
      height="fit-content"
      onClose={onClose}
    >
      <TrackIndex track={track} onClose={onClose} />
    </Modal>
  );
};

export const TrackModal = () => {
  const [isOpen, setIsOpen] = useTrackModalState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} {...isOpen} />;
};
