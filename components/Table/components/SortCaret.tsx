import { FlexColumn } from "@design-components/Flex";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import styled from "styled-components";

export const SortCaret = () => {
  return (
    <Container>
      <CaretUpContainer>
        <CaretUp
          weight="fill"
          cursor="pointer"
          color={theme.colors.hover_state}
        />
      </CaretUpContainer>
      <CaretDownContainer>
        <CaretDown
          weight="fill"
          cursor="pointer"
          color={theme.colors.hover_state}
        />
      </CaretDownContainer>
    </Container>
  );
};

const CommonCaret = styled.div`
  position: absolute;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CaretDownContainer = styled(CommonCaret)`
  bottom: 0;
`;

const CaretUpContainer = styled(CommonCaret)`
  top: 0;
`;

const Container = styled(FlexColumn)`
  gap: 0;
  position: relative;
  width: 16px;
  height: 18px;
`;
