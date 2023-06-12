import { FlexColumn, FlexRow } from "@design-components/Flex";
import { theme } from "@styles/theme";
import styled, { css } from "styled-components";

export const ThHeader = styled(FlexRow)`
  justify-content: flex-start;
  cursor: pointer;
`;

export const Th = styled.th`
  padding: 1rem;
`;

type ItemContainerProps = {
  $withOverflow?: boolean;
};

export const ItemContainer = styled.div<ItemContainerProps>`
  padding: 1rem;
  padding-inline: 1.5rem;
  ${({ $withOverflow }) =>
    $withOverflow &&
    css`
      max-width: 200px;
      min-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
`;

export const Td = styled.td`
  text-align: start;
`;

type TrProps = {
  $hasLink: boolean;
};

export const Tr = styled.tr<TrProps>`
  ${({ $hasLink }) =>
    $hasLink &&
    css`
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      &:hover {
        background-color: ${theme.colors.hover_state};
      }
    `}
`;

export const Header = styled(FlexRow)`
  gap: 0;
  justify-content: space-between;
`;

export const CallToActionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 100%;
`;

export const Thead = styled.thead``;

export const TableStyled = styled.table`
  border-spacing: 4rem 2rem;
  border-collapse: collapse;
  width: 100%;
`;

export const Container = styled.div`
  border: 1px solid ${theme.colors.primary};
  border-radius: 4px;
  position: relative;
  min-height: 20rem;
  height: 20rem;
  min-width: 500px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled(FlexColumn)`
  gap: 1rem;
`;
