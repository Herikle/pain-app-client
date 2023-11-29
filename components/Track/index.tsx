import styled from "styled-components";
import { Segment } from "./components/Segment";
import { SEGMENT_SECTION_HEIGHT } from "./components/Segment/const";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { Text } from "@components/Text";
import { theme } from "@styles/theme";
import { ChartBar, Pencil, Trash } from "@phosphor-icons/react";
import { useSetSegmentModal } from "Modals/SegmentModal/hook";
import { useSetTrackModal } from "Modals/TrackModal/hook";
import { ISegment, ITrack } from "types";
import { Element } from "react-scroll";
import { SegmentModalTabs } from "Modals/SegmentModal";
import { ListSegments } from "./components/ListSegments";
import { media } from "@styles/media-query";
import { useState } from "react";
import { DeleteTracKModal } from "Modals/DeleteTrackModal";

export const SegmentsTitleComponent = () => {
  return (
    <SegmentsTitle>
      <SegmentName>
        <Text
          variant="body2Bold"
          customColor={theme.pain_level_colors.excruciating}
        >
          Excruciating
        </Text>
      </SegmentName>
      <SegmentName>
        <Text
          variant="body2Bold"
          customColor={theme.pain_level_colors.disabling}
        >
          Disabling
        </Text>
      </SegmentName>
      <SegmentName>
        <Text variant="body2Bold" customColor={theme.pain_level_colors.hurful}>
          Hurful
        </Text>
      </SegmentName>
      <SegmentName>
        <Text
          variant="body2Bold"
          customColor={theme.pain_level_colors.annoying}
        >
          Annoying
        </Text>
      </SegmentName>
      <SegmentName>
        <Text variant="body2Bold" customColor={theme.pain_level_colors.no_pain}>
          No pain
        </Text>
      </SegmentName>
    </SegmentsTitle>
  );
};

type TrackProps = {
  track: ITrack;
};

export const Track = ({ track }: TrackProps) => {
  const setSegmentModal = useSetSegmentModal();

  const setTrackModal = useSetTrackModal();

  const [confirmDeleteTrack, setConfirmDeleteTrack] = useState(false);

  const openConfirmDelete = () => {
    setConfirmDeleteTrack(true);
  };

  const closeConfirmDelete = () => {
    setConfirmDeleteTrack(false);
  };

  const onClickSegment = (
    segment: ISegment,
    tab: SegmentModalTabs = "segment"
  ) => {
    setSegmentModal({
      segment,
      episode_id: track.episode_id,
      tab,
    });
  };

  const onClickTrackEdit = () => {
    setTrackModal({
      track,
    });
  };

  const { segments } = track;

  const hasSegments = !!segments;

  return (
    <Element name={`track_${track._id}`}>
      <Wrapper gap={2}>
        <FlexRow justify="space-between">
          <Text variant="body1Bold">{track.name}</Text>
          <FlexRow gap={2}>
            <Pencil
              size={16}
              color={theme.colors.font_color}
              cursor="pointer"
              onClick={onClickTrackEdit}
            />
            <Trash
              size={16}
              color={theme.colors.font_color}
              cursor="pointer"
              onClick={openConfirmDelete}
            />
            <ChartBar size={16} color={theme.colors.font_color} />
          </FlexRow>
        </FlexRow>
        <Container>
          <SegmentsTitleComponent />
          {hasSegments && (
            <ListSegments
              track={track}
              onClickSegment={onClickSegment}
              enableAddNewSegment
            />
          )}
        </Container>
        {!!track.comment && (
          <CommentContainer>
            <Text>{track.comment}</Text>
          </CommentContainer>
        )}
      </Wrapper>
      {confirmDeleteTrack && (
        <DeleteTracKModal onClose={closeConfirmDelete} track={track} />
      )}
    </Element>
  );
};

const CommentContainer = styled.div`
  max-width: 900px;
  margin-bottom: 2rem;
`;

const SegmentName = styled.div`
  height: ${SEGMENT_SECTION_HEIGHT}px;
  > span {
    margin-block: auto;
  }
  display: flex;
  flex-direction: column;
`;

const SegmentsTitle = styled(FlexColumn)`
  gap: 0;
  margin-top: 2rem;
  padding-right: 1.5rem;
`;

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled(FlexColumn)`
  padding-left: 2rem;
  ${media.up.mobileL`
    padding-left: 0;
  `}
`;
