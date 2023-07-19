import { Radio } from "@components/Radio";
import { Text } from "@components/Text";
import { TextArea } from "@components/TextArea";
import { SegmentsTitleComponent } from "@components/Track";
import { Segment } from "@components/Track/components/Segment";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { theme } from "@styles/theme";
import { useState } from "react";
import styled from "styled-components";

export const IntensitiesPage = () => {
  const [segmentType, setSegmentType] = useState<"draw" | "percentage">(
    "percentage"
  );

  return (
    <Container gap={3} align="flex-start">
      <FlexRow gap={6} pl={3}>
        <Radio label="Draw" name="segment_type" value="draw" />
        <Radio
          label="Percentage"
          name="segment_type"
          value="percentage"
          defaultChecked
        />
      </FlexRow>
      <FlexColumn width="100%">
        <FlexRow gap={4}>
          <FlexRow gap={0} justify="flex-start">
            <SegmentsTitleComponent />
            <Segment
              mode="values"
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
