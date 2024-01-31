import styled, { css } from "styled-components";
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
import {
  PainType,
  calculateCumulativeTime,
} from "@utils/helpers/segmentHelpers";
import v from "voca";
import { checkIfTrackHasEnoughData } from "@utils/helpers/trackHelpers";
import { TooltipContent } from "@components/TooltipContent";
import { PAIN_DEFITIONS } from "./const";

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
  removeExtraSpace?: boolean;
};

const pains: PainType[] = [
  "excruciating",
  "disabling",
  "hurful",
  "annoying",
  "no_pain",
];

const painsAbbreviation: { [key in PainType]: string } = {
  excruciating: "e",
  disabling: "d",
  hurful: "h",
  annoying: "a",
  no_pain: "n",
};

export const SegmentsTitleComponent = ({
  cumulativePainMode,
  removeExtraSpace,
}: Props) => {
  const isCumulativePainMode = !!cumulativePainMode?.active;

  const hours = cumulativePainMode?.hours;

  return (
    <SegmentsTitle>
      {pains.map((pain) => (
        <TooltipContent
          key={pain}
          tooltip={PAIN_DEFITIONS[pain]}
          place="top-start"
          minWidth={"500px"}
        >
          <SegmentName key={pain} $removeExtraSpace={removeExtraSpace}>
            {isCumulativePainMode ? (
              <FlexRow justify="start" align="center" gap={1} height="100%">
                <Text variant="h3" customColor={theme.pain_level_colors[pain]}>
                  {v.upperCase(painsAbbreviation[pain])}
                </Text>{" "}
                <Text
                  variant="body1Bold"
                  customColor={theme.pain_level_colors[pain]}
                >
                  {hours?.[painsAbbreviation[pain]]}
                </Text>
              </FlexRow>
            ) : (
              <Text variant="h3" customColor={theme.pain_level_colors[pain]}>
                {v.capitalize(pain.replace("_", " "))}
              </Text>
            )}
          </SegmentName>
        </TooltipContent>
      ))}
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
          <Text variant="h3">
            {cumulativePainMode && "Cumulative pain for "}
            {track.name}
          </Text>
          <FlexRow gap={1}>
            {!cumulativePainMode && (
              <>
                <TooltipContent tooltip="Edit track">
                  <PencilIcon size={16} onClick={onClickTrackEdit} />
                </TooltipContent>
                <TooltipContent tooltip="Delete track">
                  <TrashIcon size={16} onClick={openConfirmDelete} />
                </TooltipContent>
              </>
            )}

            {checkIfTrackHasEnoughData(track) ? (
              <TooltipContent tooltip="Cumulative pain">
                <ChartBarIcon
                  size={16}
                  color={cumulativePainMode ? theme.colors.primary : undefined}
                  weight={cumulativePainMode ? "fill" : undefined}
                  onClick={() => setCumulativePainMode(!cumulativePainMode)}
                />
              </TooltipContent>
            ) : (
              <TooltipContent tooltip="This track doesn’t have enough time data to calculate the cumulative pain.">
                <ChartBarIcon
                  size={16}
                  color={cumulativePainMode ? theme.colors.primary : undefined}
                  weight={cumulativePainMode ? "fill" : undefined}
                  cursor="default"
                />
              </TooltipContent>
            )}
          </FlexRow>
        </FlexRow>
        <Container>
          <SegmentsTitleComponent
            cumulativePainMode={{
              active: cumulativePainMode,
              hours: calculateCumulativeTime(segments),
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
          <CommentContainer $cumulativePainMode={cumulativePainMode}>
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

type ChartBarProps = {
  cursor?: string;
};

const ChartBarIcon = styled(ChartBar)<ChartBarProps>`
  ${IconCommonStyle}

  ${({ cursor }) =>
    cursor &&
    css`
      cursor: ${cursor};
    `}
`;

type CommentContainerProps = {
  $cumulativePainMode: boolean;
};

const CommentContainer = styled.div<CommentContainerProps>`
  max-width: 900px;
  margin-bottom: 2rem;
  opacity: ${({ $cumulativePainMode }) => ($cumulativePainMode ? 0 : 1)};
`;

type SegmentProps = {
  $removeExtraSpace?: boolean;
};

const SegmentName = styled.div<SegmentProps>`
  height: ${SEGMENT_SECTION_HEIGHT}px;
  > span {
    margin-block: auto;
  }
  display: flex;
  flex-direction: column;
  ${({ $removeExtraSpace }) =>
    $removeExtraSpace
      ? css`
          width: fit-content;
        `
      : css`
          min-width: 180px;
        `}
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
