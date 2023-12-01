import styled, { css } from "styled-components";
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

type Props = {
  cumulativePainMode?: {
    active: boolean;
    hours: {
      e: string;
      d: string;
      h: string;
      a: string;
      n: string;
    };
  };
};

export const SegmentsTitleComponent = ({ cumulativePainMode }: Props) => {
  const isCumulativePainMode = !!cumulativePainMode?.active;

  const hours = cumulativePainMode?.hours;

  return (
    <SegmentsTitle>
      <SegmentName>
        <Text
          variant="body2Bold"
          customColor={theme.pain_level_colors.excruciating}
        >
          {isCumulativePainMode ? (
            <FlexRow justify="start" gap={1}>
              <span>E</span> <span>{hours?.e}</span>
            </FlexRow>
          ) : (
            "Excruciating"
          )}
        </Text>
      </SegmentName>
      <SegmentName>
        <Text
          variant="body2Bold"
          customColor={theme.pain_level_colors.disabling}
        >
          {isCumulativePainMode ? (
            <FlexRow justify="start" gap={1}>
              <span>D</span> <span>{hours?.d}</span>
            </FlexRow>
          ) : (
            "Disabling"
          )}
        </Text>
      </SegmentName>
      <SegmentName>
        <Text variant="body2Bold" customColor={theme.pain_level_colors.hurful}>
          {isCumulativePainMode ? (
            <FlexRow justify="start" gap={1}>
              <span>H</span> <span>{hours?.h}</span>
            </FlexRow>
          ) : (
            "Hurful"
          )}
        </Text>
      </SegmentName>
      <SegmentName>
        <Text
          variant="body2Bold"
          customColor={theme.pain_level_colors.annoying}
        >
          {isCumulativePainMode ? (
            <FlexRow justify="start" gap={1}>
              <span>A</span> <span>{hours?.a}</span>
            </FlexRow>
          ) : (
            "Annoying"
          )}
        </Text>
      </SegmentName>
      <SegmentName>
        <Text variant="body2Bold" customColor={theme.pain_level_colors.no_pain}>
          {isCumulativePainMode ? (
            <FlexRow justify="start" gap={1}>
              <span>N</span> <span>{hours?.n}</span>
            </FlexRow>
          ) : (
            "No pain"
          )}
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

  const [cumulativePainMode, setCumulativePainMode] = useState(false);

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
          <Text variant="body1Bold">
            {cumulativePainMode && "Cumulative pain for "}
            {track.name}
          </Text>
          <FlexRow gap={1}>
            {!cumulativePainMode && (
              <>
                <PencilIcon size={16} onClick={onClickTrackEdit} />
                <TrashIcon size={16} onClick={openConfirmDelete} />
              </>
            )}

            <ChartBarIcon
              size={16}
              color={cumulativePainMode ? theme.colors.primary : undefined}
              weight={cumulativePainMode ? "fill" : undefined}
              onClick={() => setCumulativePainMode(!cumulativePainMode)}
            />
          </FlexRow>
        </FlexRow>
        <Container>
          <SegmentsTitleComponent
            cumulativePainMode={{
              active: cumulativePainMode,
              hours: {
                e: "12.5 - 15hr",
                d: "6 - 12hr",
                h: "3 - 6hr",
                a: "1 - 1.5hr",
                n: "0.5 - 0.75hr",
              },
            }}
          />
          {hasSegments && (
            <ListSegments
              track={track}
              onClickSegment={onClickSegment}
              cumulativePainMode={cumulativePainMode}
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

const IconCommonStyle = css`
  color: ${theme.colors.text_switched};
  cursor: pointer;
  border-radius: 50%;
  padding: 0.25rem;

  box-sizing: content-box;

  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    color: ${theme.colors.font_color};
    background-color: ${theme.colors.light_grey};
  }
`;

const PencilIcon = styled(Pencil)`
  ${IconCommonStyle}
`;

const TrashIcon = styled(Trash)`
  ${IconCommonStyle}
`;

const ChartBarIcon = styled(ChartBar)`
  ${IconCommonStyle}
`;

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
  min-width: 120px;
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
