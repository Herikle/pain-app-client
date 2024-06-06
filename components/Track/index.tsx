import { FlexRow } from "@design-components/Flex";
import {
  ChartBarIcon,
  CommentContainer,
  Container,
  NameAndActions,
  PencilIcon,
  TrashIcon,
  Wrapper,
} from "./styles";
import { Text } from "@components/Text";
import { theme } from "@styles/theme";
import { useSetSegmentModal } from "@Modals/SegmentModal/hook";
import { useSetTrackModal } from "@Modals/TrackModal/hook";
import { ISegment } from "types";
import { Element } from "react-scroll";
import { SegmentModalTabs } from "@Modals/SegmentModal";
import { ListSegments } from "./components/ListSegments";
import { use, useMemo, useState } from "react";
import { DeleteTracKModal } from "@Modals/DeleteTrackModal";
import { calculateCumulativeTime } from "@utils/helpers/segmentHelpers";

import { checkIfTrackHasEnoughData } from "@utils/helpers/trackHelpers";
import { TooltipContent } from "@components/TooltipContent";
import { SegmentsTitleComponent } from "./components/SegmentsTitleComponent";

type TrackItem = {
  _id: string;
  name: string;
  pain_type: "psychological" | "physical";
  segments?: ISegment[];
  episode_id: string;
  comment?: string;
};

type TrackProps = {
  track: TrackItem;
  isCreator?: boolean;
};

export const Track = ({ track, isCreator }: TrackProps) => {
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

  const enoughDataCheck = useMemo(
    () => checkIfTrackHasEnoughData(track),
    [track]
  );

  const isSomeSegmentDraw = useMemo(() => {
    if (!segments) return false;
    return segments.some((segment) => segment.intensities.type === "draw");
  }, [segments]);

  const getCumulativePainValidToolTip = () => {
    if (isSomeSegmentDraw) {
      return "Cumulative pain: This track has segments with drawn intensities. Cumulative pain is not available for these segments.";
    }

    return "Cumulative pain";
  };

  return (
    <Element name={`track_${track._id}`} data-cy="track-component">
      <Wrapper gap={2}>
        <NameAndActions>
          <Text variant="h3">
            {cumulativePainMode && "Cumulative pain for "}
            <Text variant="h3" onClick={onClickTrackEdit} cursor="pointer">
              {track.name}
            </Text>
          </Text>
          <FlexRow gap={1}>
            {!cumulativePainMode && isCreator && (
              <>
                <TooltipContent tooltip="Edit track">
                  <PencilIcon
                    size={16}
                    onClick={onClickTrackEdit}
                    data-cy="edit-track-button"
                    data-testid="edit-track-button"
                  />
                </TooltipContent>
                <TooltipContent tooltip="Delete track">
                  <TrashIcon
                    size={16}
                    onClick={openConfirmDelete}
                    data-cy="delete-track-button"
                    data-testid="delete-track-button"
                  />
                </TooltipContent>
              </>
            )}

            {enoughDataCheck.valid ? (
              <TooltipContent tooltip={getCumulativePainValidToolTip()}>
                <ChartBarIcon
                  size={16}
                  color={cumulativePainMode ? theme.colors.primary : undefined}
                  weight={cumulativePainMode ? "fill" : undefined}
                  onClick={() => setCumulativePainMode(!cumulativePainMode)}
                />
              </TooltipContent>
            ) : (
              <TooltipContent
                tooltip={`This track doesn’t have enough time data to calculate the cumulative pain. ${
                  enoughDataCheck.message ?? ""
                }`}
              >
                <ChartBarIcon
                  size={16}
                  color={cumulativePainMode ? theme.colors.primary : undefined}
                  weight={cumulativePainMode ? "fill" : undefined}
                  cursor="default"
                />
              </TooltipContent>
            )}
          </FlexRow>
        </NameAndActions>
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
              isCreator={isCreator}
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
