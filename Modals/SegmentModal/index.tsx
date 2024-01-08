import { Modal } from "../Modal";
import { useSegmentModalState } from "./hook";
import { SegmentIndex } from "./components/SegmentIndex";
import { ISegment } from "types";

export type CommonSegmentModalProps<T> = {
  onChange: (data: Partial<T>) => void;
  onValidChange: (valid: boolean) => void;
};

export type SegmentModalTabs =
  | "segment"
  | "intensities"
  | "quality"
  | "intervention"
  | "symptoms";

export type SegmentModalChildProps = {
  onClose: () => void;
  segment: ISegment;
  episode_id: string;
  tab?: SegmentModalTabs;
};

const Child = ({
  onClose,
  segment,
  episode_id,
  tab = "segment",
}: SegmentModalChildProps) => {
  return (
    <Modal
      removePadding
      removeOverlay
      fullScreenOnMobile
      height="fit-content"
      onClose={onClose}
    >
      <SegmentIndex
        tab={tab}
        segment={segment}
        episode_id={episode_id}
        onClose={onClose}
      />
    </Modal>
  );
};

export const SegmentModal = () => {
  const [isOpen, setIsOpen] = useSegmentModalState();

  if (!isOpen) return null;

  return <Child onClose={() => setIsOpen(null)} {...isOpen} />;
};
