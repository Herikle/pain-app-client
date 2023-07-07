import styled from "styled-components";
import { SEGMENT_SECTION_HEIGHT, Segment } from "./components/Segment";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { Text } from "@components/Text";
import { theme } from "@styles/theme";
import { NotePencil } from "@phosphor-icons/react";
import { useSetSegmentModal } from "@components/Modals/SegmentModal/hook";

export const SegmentsTitleComponent = () => {
  return (
    <SegmentsTitle>
      <SegmentName>
        <Text
          variant="body2Bold"
          customColor={theme.pain_level_colors.excruciating}
        >
          Excruciating
        </Text>
      </SegmentName>
      <SegmentName>
        <Text
          variant="body2Bold"
          customColor={theme.pain_level_colors.disabling}
        >
          Disabling
        </Text>
      </SegmentName>
      <SegmentName>
        <Text variant="body2Bold" customColor={theme.pain_level_colors.hurful}>
          Hurful
        </Text>
      </SegmentName>
      <SegmentName>
        <Text
          variant="body2Bold"
          customColor={theme.pain_level_colors.annoying}
        >
          Annoying
        </Text>
      </SegmentName>
    </SegmentsTitle>
  );
};

export const Track = () => {
  const setSegmentModal = useSetSegmentModal();

  const onClickSegment = () => {
    setSegmentModal({
      segment: {},
    });
  };

  return (
    <Wrapper gap={2}>
      <FlexRow justify="flex-start">
        <Text variant="body1Bold">Arm pain</Text>
        <NotePencil
          size={16}
          color={theme.colors.font_color}
          weight="fill"
          cursor="pointer"
          onClick={() => alert("not implemented yet")}
        />
      </FlexRow>
      <Container>
        <SegmentsTitleComponent />
        <SegmentsContainer>
          {[...Array(4)].map((_, index) => (
            <Segment
              name="Segment name with a giant name to test the ellipsis"
              key={index}
              hasDraw
              readOnly
              onClick={onClickSegment}
            />
          ))}
        </SegmentsContainer>
      </Container>
    </Wrapper>
  );
};

const SegmentName = styled.div`
  height: ${SEGMENT_SECTION_HEIGHT}px;
  > span {
    margin-block: auto;
  }
  display: flex;
  flex-direction: column;
`;

const SegmentsContainer = styled.div`
  display: flex;
`;

const SegmentsTitle = styled(FlexColumn)`
  gap: 0;
  margin-top: 2rem;
  padding-right: 1.5rem;
`;

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled(FlexColumn)`
  padding-left: 2rem;
`;
