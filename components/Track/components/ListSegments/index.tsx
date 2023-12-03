import styled from "styled-components";
import { Segment } from "../Segment";
import { ISegment, ITrack } from "types";
import { SegmentModalTabs } from "Modals/SegmentModal";
import { AddButton } from "@components/AddButton";
import { FlexRow } from "@design-components/Flex";
import { Tooltip } from "react-tooltip";
import { useCreateSegment } from "@queries/segment/useSegment";
import { LightScrollBar } from "@styles/theme";
import { useRef } from "react";

type ListSegmentsProps = {
  onClickSegment: (segment: ISegment, tab?: SegmentModalTabs) => void;
  track: ITrack;
  cumulativePainMode?: boolean;
  enableAddNewSegment?: boolean;
};

export const ListSegments = ({
  onClickSegment,
  track,
  cumulativePainMode = false,
  enableAddNewSegment = false,
}: ListSegmentsProps) => {
  const segmentsListRef = useRef<HTMLDivElement>(null);

  const segments = track.segments;

  const createSegment = useCreateSegment();

  const onClickAddNewSegment = async () => {
    await createSegment.mutateAsync({
      body: {
        track_id: track._id,
      },
      extra: {
        episode_id: track.episode_id,
      },
    });

    setTimeout(() => {
      if (segmentsListRef.current) {
        segmentsListRef.current.scrollLeft =
          segmentsListRef.current.scrollWidth;
      }
    }, 500);
  };

  return (
    <OuterContaier>
      <SegmentsContainer ref={segmentsListRef}>
        {segments?.map((segment, index) => (
          <Segment
            key={index}
            segment={segment}
            hasDraw
            readOnly
            onClick={(tab) => onClickSegment(segment, tab)}
            showFooterDetails
            cumulativePainMode={cumulativePainMode}
          />
        ))}
      </SegmentsContainer>
      {enableAddNewSegment && (
        <AddContainer>
          <AddButton
            onClick={onClickAddNewSegment}
            id={`adic-segment-button-${track._id}`}
            color="hover_state"
            loading={createSegment.isLoading}
          />
          <Tooltip anchorSelect={`#adic-segment-button-${track._id}`}>
            Add new segment
          </Tooltip>
        </AddContainer>
      )}
    </OuterContaier>
  );
};

const AddContainer = styled.div`
  transform: translateY(-50%);
`;

const SegmentsContainer = styled.div`
  display: flex;
  max-width: 60vw;
  overflow-x: auto;
  ${LightScrollBar};
  padding-bottom: 0.5rem;
  scroll-behavior: smooth;
`;

const OuterContaier = styled(FlexRow)``;
