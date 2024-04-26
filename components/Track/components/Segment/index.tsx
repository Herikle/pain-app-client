import { Container, SegmentName, Wrapper } from "./style";
import { Text } from "@components/Text";
import { ISegment } from "types";
import { SEGMENT_WIDTH } from "./const";
import { SegmentDraw } from "./components/SegmentDraw";
import { SegmentValues, onChangeValueProps } from "./components/SegmentValues";
import styled, { css } from "styled-components";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import Image from "next/image";
import { IconsPath } from "@utils/icons";
import { SegmentModalTabs } from "@Modals/SegmentModal";
import { Tooltip } from "react-tooltip";
import v from "voca";
import { getTimeUnitAbbreviation } from "@utils/helpers/segmentHelpers";
import { DrawObject } from "@components/Paint";

type SegmentProps = {
  segment: ISegment;
  hasDraw?: boolean;
  readOnly?: boolean;
  onClick?: (tab?: SegmentModalTabs) => void;
  backgroundColor?: string;
  isSolitary?: boolean;
  onChangeValues?: (data: onChangeValueProps) => void;
  onChangeDraw?: (data: DrawObject[]) => void;
  showFooterDetails?: boolean;
  cumulativePainMode?: boolean;
  hideSegmentName?: boolean;
};

export const Segment = ({
  segment,
  hasDraw = false,
  readOnly = false,
  onClick,
  backgroundColor,
  isSolitary = false,
  onChangeValues,
  onChangeDraw,
  showFooterDetails = false,
  cumulativePainMode = false,
  hideSegmentName = false,
}: SegmentProps) => {
  const { name, intensities } = segment;
  const { type } = intensities;

  return (
    <Wrapper $isSolitary={isSolitary}>
      <SegmentName>
        {!hideSegmentName && (
          <Text
            variant="body1Bold"
            align="center"
            textElipsis
            maxWidth={`${SEGMENT_WIDTH}px`}
          >
            {name ?? ""}
          </Text>
        )}
      </SegmentName>
      <Container
        data-cy="segment-component"
        $hasClick={!!onClick}
        onClick={() => onClick?.()}
        $bgColor={backgroundColor}
      >
        {type === "draw" ? (
          <SegmentDraw
            hasDraw={hasDraw}
            readOnly={readOnly}
            onChangeDraw={onChangeDraw}
            initialDrawValue={intensities.draw}
          />
        ) : (
          <SegmentValues
            readOnly={readOnly}
            values={intensities.values}
            onChange={onChangeValues}
            segmentTime={{
              min: segment.start,
              max: segment.end,
            }}
            cumulativePainMode={cumulativePainMode}
            timeUnit={segment.time_unit}
          />
        )}
      </Container>
      {showFooterDetails && (
        <SegmentFooter
          mt={1}
          align="center"
          $cumulativePainMode={cumulativePainMode}
        >
          {(!!segment.start || !!segment.end) && (
            <TimeSegment>
              <Text variant="h3">
                {segment.start ?? "?"}~{segment.end ?? "?"}
                {getTimeUnitAbbreviation(segment.time_unit)}
              </Text>
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
            {segment.interventions.length > 0 && (
              <>
                <Image
                  src={IconsPath.Invervention}
                  width={22}
                  height={22}
                  alt="Intervention"
                  onClick={() => onClick?.("intervention")}
                  id={`intervention-${segment._id}`}
                />
                <Tooltip anchorSelect={`#intervention-${segment._id}`}>
                  {segment.interventions
                    .map((intervention) => intervention.name)
                    .join(", ")}
                </Tooltip>
              </>
            )}
            {segment.symptoms.length > 0 && (
              <>
                <Image
                  src={IconsPath.Symptom}
                  width={22}
                  height={22}
                  alt="Symptom"
                  onClick={() => onClick?.("symptoms")}
                  id={`symptom-${segment._id}`}
                />
                <Tooltip anchorSelect={`#symptom-${segment._id}`}>
                  {segment.symptoms.map((symptom) => symptom.name).join(", ")}
                </Tooltip>
              </>
            )}
          </QualityIcons>
        </SegmentFooter>
      )}
    </Wrapper>
  );
};

const QualityIcons = styled(FlexRow)`
  > * {
    cursor: pointer;
  }
`;

const TimeSegment = styled.div``;

type SegmentFooterProps = {
  $cumulativePainMode: boolean;
};

const SegmentFooter = styled(FlexColumn)<SegmentFooterProps>`
  min-height: 49px;

  ${({ $cumulativePainMode }) =>
    $cumulativePainMode &&
    css`
      opacity: 0;
    `}
`;
