import { Paint } from "@components/Paint";
import { Text } from "@components/Text";
import { theme } from "@styles/theme";
import styled, { css } from "styled-components";

const SIZE_MULTIPLIER = 1.5;

const width = 120 * SIZE_MULTIPLIER;
const section_height = 36 * SIZE_MULTIPLIER;
const height = section_height * 4;

type SegmentProps = {
  hasDraw?: boolean;
  readOnly?: boolean;
  onClick?: () => void;
  backgroundColor?: string;
  isSolitary?: boolean;
  name?: string;
};

export const Segment = ({
  hasDraw = false,
  readOnly = false,
  onClick,
  backgroundColor,
  isSolitary = false,
  name = "",
}: SegmentProps) => {
  return (
    <Wrapper $isSolitary={isSolitary}>
      <SegmentName>
        <Text align="center" textElipsis maxWidth={`${width}px`}>
          {name}
        </Text>
      </SegmentName>
      <Container
        $hasClick={!!onClick}
        onClick={onClick}
        $bgColor={backgroundColor}
      >
        <Section />
        <Section />
        <Section />
        <Section />
        {hasDraw && <Paint width={width} height={height} readOnly={readOnly} />}
      </Container>
    </Wrapper>
  );
};

const SegmentName = styled.div`
  width: ${width}px;
  text-align: center;
  margin-bottom: 0.5rem;
  min-height: 1.5rem;
  max-height: 1.5rem;
  display: flex;
  padding-inline: 0.5rem;
`;

const Section = styled.div`
  width: ${width}px;
  height: ${section_height}px;
  border: 2px solid ${theme.colors.font_color};
  border-left: none;
  border-right: none;
  &:not(:first-child) {
    border-top: none;
  }
`;

type ContainerProps = {
  $hasClick: boolean;
  $bgColor?: string;
};

const Container = styled.div<ContainerProps>`
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
`;

type WrapperProps = {
  $isSolitary: boolean;
};

const Wrapper = styled.div<WrapperProps>`
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
