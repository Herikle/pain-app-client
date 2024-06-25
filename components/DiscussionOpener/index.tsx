import { useSetDiscussionModal } from "@Modals/DiscussionModal/hook";
import { TooltipContent } from "@components/TooltipContent";
import { ChatCircle } from "@phosphor-icons/react";
import { theme } from "@styles/theme";

type DiscussionOpenerProps = {
  patient_id: string;
  episode_id: string | null;
  track_id: string | null;
  segment_id: string | null;
  breadcrumb: string[];
  size?: number;
};

export const DiscussionOpener = ({
  patient_id,
  episode_id,
  segment_id,
  track_id,
  breadcrumb,
  size = 24,
}: DiscussionOpenerProps) => {
  const setDiscussionModal = useSetDiscussionModal();

  const openDiscussion = () => {
    setDiscussionModal({
      discussion_path: {
        episode_id,
        segment_id,
        track_id,
        breadcrumb: breadcrumb,
        patient_id,
      },
    });
  };

  return (
    <TooltipContent tooltip="Discussions">
      <ChatCircle
        size={size}
        color={theme.colors.text_switched}
        cursor="pointer"
        onClick={openDiscussion}
      />
    </TooltipContent>
  );
};
