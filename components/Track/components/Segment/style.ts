import styled, { css } from "styled-components";
import { SEGMENT_WIDTH } from "./const";
import { theme } from "@styles/theme";
import { transparentize } from "polished";

export const SegmentName = styled.div`
  width: ${SEGMENT_WIDTH}px;
  text-align: center;
  margin-bottom: 0.5rem;
  min-height: 1.5rem;
  max-height: 1.5rem;
  display: flex;
  padding-inline: 0.5rem;
`;

type ContainerProps = {
  $hasClick: boolean;
  $bgColor?: string;
};

export const Container = styled.div<ContainerProps>`
  position: relative;
  border: 2px solid ${theme.colors.font_color};
  border-top: none;
  border-bottom: none;
  width: fit-content;
  cursor: ${({ $hasClick }) => ($hasClick ? "pointer" : "default")};
  ${({ $bgColor }) =>
    $bgColor &&
    css`
      background-color: ${$bgColor};
    `}
  transition: background-color 0.2s ease-in-out;
  ${({ $hasClick }) =>
    $hasClick &&
    css`
      &:hover {
        background-color: ${transparentize(0.6, theme.colors.primary)};
      }
    `};
`;

type WrapperProps = {
  $isSolitary: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  ${({ $isSolitary }) =>
    !$isSolitary &&
    css`
      &:not(:first-child) {
        ${Container} {
          border-left: none;
        }
      }
    `}
`;
