import styled, { css } from "styled-components";
import { ChartBar, Pencil, Trash } from "@phosphor-icons/react";
import { media } from "@styles/media-query";
import { theme } from "@styles/theme";
import { FlexColumn } from "@design-components/Flex";

export const NameAndActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;

  ${media.up.tablet`
    flex-direction: column;
    align-items: flex-start;
  `}
`;

const IconCommonStyle = css`
  color: ${theme.colors.text_switched};
  cursor: pointer;
  border-radius: 50%;
  padding: 0.25rem;

  box-sizing: content-box;

  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    color: ${theme.colors.font_color};
    background-color: ${theme.colors.light_grey};
  }
`;

export const PencilIcon = styled(Pencil)`
  ${IconCommonStyle}
`;

export const TrashIcon = styled(Trash)`
  ${IconCommonStyle}
`;

type ChartBarProps = {
  cursor?: string;
};

export const ChartBarIcon = styled(ChartBar)<ChartBarProps>`
  ${IconCommonStyle}

  ${({ cursor }) =>
    cursor &&
    css`
      cursor: ${cursor};
    `}
`;

type CommentContainerProps = {
  $cumulativePainMode: boolean;
};

export const CommentContainer = styled.div<CommentContainerProps>`
  max-width: 900px;
  margin-bottom: 2rem;
  opacity: ${({ $cumulativePainMode }) => ($cumulativePainMode ? 0 : 1)};
`;

export const Container = styled.div`
  display: flex;
`;

export const Wrapper = styled(FlexColumn)`
  padding-left: 2rem;
  ${media.up.mobileL`
    padding-left: 0;
  `}
`;
