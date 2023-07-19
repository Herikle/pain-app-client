import { Paint } from "@components/Paint";
import { Text } from "@components/Text";
import { theme } from "@styles/theme";
import { transparentize } from "polished";
import styled, { css } from "styled-components";

const SIZE_MULTIPLIER = 1.5;

export const SEGMENT_WIDTH = 120 * SIZE_MULTIPLIER;

export const SEGMENT_SECTION_HEIGHT = 42 * SIZE_MULTIPLIER;

export const SEGMENT_HEIGHT = SEGMENT_SECTION_HEIGHT * 4;

type SegmentProps = {
  hasDraw?: boolean;
  readOnly?: boolean;
  onClick?: () => void;
  backgroundColor?: string;
  isSolitary?: boolean;
  name?: string;
  mode?: "draw" | "values";
};

export const Segment = ({
  hasDraw = false,
  readOnly = false,
  onClick,
  backgroundColor,
  isSolitary = false,
  name = "",
  mode = "draw",
}: SegmentProps) => {
  return (
    <Wrapper $isSolitary={isSolitary}>
      <SegmentName>
        <Text align="center" textElipsis maxWidth={`${SEGMENT_WIDTH}px`}>
          {name}
        </Text>
      </SegmentName>
      <Container
        $hasClick={!!onClick}
        onClick={onClick}
        $bgColor={backgroundColor}
      >
        {mode === "draw" ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <Section key={index} />
            ))}
          </>
        ) : (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <Section key={index}>
                <Input />
              </Section>
            ))}
          </>
        )}
        {mode === "draw" && hasDraw && (
          <Paint
            width={SEGMENT_WIDTH}
            height={SEGMENT_HEIGHT}
            readOnly={readOnly}
          />
        )}
      </Container>
    </Wrapper>
  );
};

const Input = styled.input`
  height: 100%;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 1rem;
  font-size: 1.5rem;
`;

const SegmentName = styled.div`
  width: ${SEGMENT_WIDTH}px;
  text-align: center;
  margin-bottom: 0.5rem;
  min-height: 1.5rem;
  max-height: 1.5rem;
  display: flex;
  padding-inline: 0.5rem;
`;

const Section = styled.div`
  width: ${SEGMENT_WIDTH}px;
  height: ${SEGMENT_SECTION_HEIGHT}px;
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
