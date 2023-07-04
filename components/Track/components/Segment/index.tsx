import { Paint } from "@components/Paint";
import { Text } from "@components/Text";
import { theme } from "@styles/theme";
import styled from "styled-components";

const SIZE_MULTIPLIER = 1.5;

const width = 120 * SIZE_MULTIPLIER;
const section_height = 36 * SIZE_MULTIPLIER;
const height = section_height * 4;

type SegmentProps = {
  hasDraw?: boolean;
};

export const Segment = ({ hasDraw = false }: SegmentProps) => {
  return (
    <Wrapper>
      <SegmentName>
        <Text align="center" textElipsis maxWidth={`${width}px`}>
          Nome de segmento bem grande pra poder testar direitinho
        </Text>
      </SegmentName>
      <Container>
        <Section />
        <Section />
        <Section />
        <Section />
        {hasDraw && <Paint width={width} height={height} />}
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

const Container = styled.div`
  position: relative;
  border: 2px solid ${theme.colors.font_color};
  border-top: none;
  border-bottom: none;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  &:not(:first-child) {
    ${Container} {
      border-left: none;
    }
  }
`;
