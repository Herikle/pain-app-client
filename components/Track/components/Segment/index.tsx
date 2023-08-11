import { Container, SegmentName, Wrapper } from "./style";
import { Text } from "@components/Text";
import { ISegment } from "types";
import { SEGMENT_WIDTH } from "./const";
import { SegmentDraw } from "./components/SegmentDraw";
import { SegmentValues, onChangeValueProps } from "./components/SegmentValues";
import styled from "styled-components";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import Image from "next/image";
import { IconsPath } from "@utils/icons";
import { SegmentModalTabs } from "@components/Modals/SegmentModal";
import { Tooltip } from "react-tooltip";
import v from "voca";
import { getTimeUnitAbbreviation } from "@utils/helpers/segmentHelpers";

type SegmentProps = {
  hasDraw?: boolean;
  readOnly?: boolean;
  onClick?: (tab?: SegmentModalTabs) => void;
  backgroundColor?: string;
  isSolitary?: boolean;
  segment: ISegment;
  onChangeValues?: (data: onChangeValueProps) => void;
};

export const Segment = ({
  hasDraw = false,
  readOnly = false,
  onClick,
  backgroundColor,
  isSolitary = false,
  segment,
  onChangeValues,
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
        onClick={() => onClick?.()}
        $bgColor={backgroundColor}
      >
        {type === "draw" ? (
          <SegmentDraw hasDraw={hasDraw} readOnly={readOnly} />
        ) : (
          <SegmentValues
            readOnly={readOnly}
            values={intensities.values}
            onChange={onChangeValues}
          />
        )}
      </Container>
      <SegmentFooter mt={1} align="center">
        {(!!segment.start || !!segment.end) && (
          <TimeSegment>
            {segment.start ?? "?"}~{segment.end ?? "?"}
            {getTimeUnitAbbreviation(segment.time_unit)}
          </TimeSegment>
        )}
        <QualityIcons>
          {segment.quality?.texture && (
            <>
              <Image
                src={IconsPath.texture?.[segment.quality.texture]}
                width={22}
                height={22}
                alt="Quality Texture"
                onClick={() => onClick?.("quality")}
                id={`quality-texture-${segment._id}`}
              />
              <Tooltip anchorSelect={`#quality-texture-${segment._id}`}>
                {v.capitalize(segment.quality.texture)}
              </Tooltip>
            </>
          )}
          {segment.quality?.depth && (
            <>
              <Image
                src={IconsPath.depth?.[segment.quality.depth]}
                width={22}
                height={22}
                alt="Quality Depth"
                onClick={() => onClick?.("quality")}
                id={`quality-depth-${segment._id}`}
              />
              <Tooltip anchorSelect={`#quality-depth-${segment._id}`}>
                {v.capitalize(segment.quality.depth)}
              </Tooltip>
            </>
          )}
          {segment.quality?.anatomy && (
            <>
              <Image
                src={IconsPath.depth.anatomy}
                width={22}
                height={22}
                alt="Quality Anatomy"
                onClick={() => onClick?.("quality")}
                id={`quality-anatomy-${segment._id}`}
              />
              <Tooltip anchorSelect={`#quality-anatomy-${segment._id}`}>
                {segment.quality.anatomy}
              </Tooltip>
            </>
          )}
        </QualityIcons>
      </SegmentFooter>
    </Wrapper>
  );
};

const QualityIcons = styled(FlexRow)`
  > * {
    cursor: pointer;
  }
`;

const TimeSegment = styled.div``;

const SegmentFooter = styled(FlexColumn)``;
