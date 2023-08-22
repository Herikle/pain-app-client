import { Text } from "@components/Text";
import { ListSegments } from "@components/Track/components/ListSegments";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { WarningCircle } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import styled from "styled-components";
import { ITrack } from "types";

type TrackIntensityOverTrackPageProps = {
  track: ITrack;
};

export const TrackIntensityOverTrackPage = ({
  track,
}: TrackIntensityOverTrackPageProps) => {
  const segments = track.segments;

  const hasSegments = !!segments;

  return (
    <Container gap={4} align="flex-start">
      <FlexRow marginInline="2rem">
        <WarningCircle
          size={32}
          color={theme.colors.font_color}
          weight="fill"
        />
        <Text color="font_color">
          Here you can draw directly over your whole track. To edit a specific
          segment, add or delete segments, close this panel.
        </Text>
      </FlexRow>
      {hasSegments && <ListSegments onClickSegment={() => {}} track={track} />}
    </Container>
  );
};

const Container = styled(FlexColumn)``;
