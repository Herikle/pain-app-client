import styled from "styled-components";
import { SEGMENT_SECTION_HEIGHT, SEGMENT_WIDTH } from "../const";
import { theme } from "@styles/theme";

export const Section = styled.div`
  width: ${SEGMENT_WIDTH}px;
  height: ${SEGMENT_SECTION_HEIGHT}px;
  border: 2px solid ${theme.colors.font_color};
  border-left: none;
  border-right: none;
  &:not(:first-child) {
    border-top: none;
  }
`;
