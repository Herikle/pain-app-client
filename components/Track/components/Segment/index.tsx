import { Container, SegmentName, Wrapper } from "./style";
import { Text } from "@components/Text";
import { ISegment } from "types";
import { SEGMENT_WIDTH } from "./const";
import { SegmentDraw } from "./components/SegmentDraw";
import { SegmentValues } from "./components/SegmentValues";

type SegmentProps = {
  hasDraw?: boolean;
  readOnly?: boolean;
  onClick?: () => void;
  backgroundColor?: string;
  isSolitary?: boolean;
  segment: ISegment;
};

export const Segment = ({
  hasDraw = false,
  readOnly = false,
  onClick,
  backgroundColor,
  isSolitary = false,
  segment,
}: SegmentProps) => {
  const { name, intensities } = segment;
  const { type } = intensities;
  return (
    <Wrapper $isSolitary={isSolitary}>
      <SegmentName>
        <Text align="center" textElipsis maxWidth={`${SEGMENT_WIDTH}px`}>
          {name ?? ""}
        </Text>
      </SegmentName>
      <Container
        $hasClick={!!onClick}
        onClick={onClick}
        $bgColor={backgroundColor}
      >
        {type === "draw" ? (
          <SegmentDraw hasDraw={hasDraw} readOnly={readOnly} />
        ) : (
          <SegmentValues readOnly={readOnly} values={intensities.values} />
        )}
      </Container>
    </Wrapper>
  );
};
