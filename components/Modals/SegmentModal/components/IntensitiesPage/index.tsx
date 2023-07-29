import { Radio } from "@components/Radio";
import { Text } from "@components/Text";
import { TextArea } from "@components/TextArea";
import { SegmentsTitleComponent } from "@components/Track";
import { Segment } from "@components/Track/components/Segment";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { theme } from "@styles/theme";
import { useState } from "react";
import styled from "styled-components";
import { ISegment, ISegmentIntensities } from "types";

type Props = {
  intensities: ISegmentIntensities;
  segment: ISegment;
};

export const IntensitiesPage = ({ intensities, segment }: Props) => {
  const { type } = intensities;

  return (
    <Container gap={3} align="flex-start">
      <FlexRow gap={6} pl={3}>
        <Radio
          label="Draw"
          name="segment_type"
          value="draw"
          defaultChecked={type === "draw"}
        />
        <Radio
          label="Percentage"
          name="segment_type"
          value="values"
          defaultChecked={type === "values"}
        />
      </FlexRow>
      <FlexColumn width="100%">
        <FlexRow gap={4}>
          <FlexRow gap={0} justify="flex-start">
            <SegmentsTitleComponent />
            <Segment
              segment={segment}
              backgroundColor={theme.colors.pastel}
              isSolitary
            />
          </FlexRow>
          <TextArea
            fullWidth
            label="Justification"
            placeholder="Write something"
            minRows={15}
            maxRows={15}
          />
        </FlexRow>
        <Text maxWidth="300px">
          Tip: try to measure your pain drawing a line with the mouse between
          the indicators.
        </Text>
      </FlexColumn>
    </Container>
  );
};

const Container = styled(FlexColumn)``;
