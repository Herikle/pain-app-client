import styled from "styled-components";

type FlexProps = {
  gap?: number;
};

export const FlexRow = styled.div<FlexProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => (props.gap ? `${props.gap}rem` : "0.5rem")};
`;

export const FlexColumn = styled.div<FlexProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${(props) => (props.gap ? `${props.gap}rem` : "0.5rem")};
`;
