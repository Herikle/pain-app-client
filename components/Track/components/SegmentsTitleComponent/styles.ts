import styled, { css } from "styled-components";
import { SEGMENT_SECTION_HEIGHT } from "../Segment/const";
import { FlexColumn } from "@design-components/Flex";
import { theme } from "@styles/theme";

type SegmentProps = {
  $removeExtraSpace?: boolean;
};

export const SegmentName = styled.div<SegmentProps>`
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

export const SegmentsTitle = styled(FlexColumn)`
  gap: 0;
  margin-top: 2rem;
  padding-right: 1.5rem;
`;
