import styled, { CSSProperties } from "styled-components";

type FlexProps = {
  gap?: number;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  width?: CSSProperties["width"];
  marginInline?: CSSProperties["marginInline"];
  mt?: CSSProperties["marginTop"];
  pl?: CSSProperties["paddingLeft"];
};

export const FlexRow = styled.div<FlexProps>`
  display: flex;
  align-items: ${(props) => props.align ?? "center"};
  justify-content: ${(props) => props.justify ?? "center"};
  gap: ${(props) => (props.gap ? `${props.gap}rem` : "0.5rem")};
  width: ${(props) => props.width ?? "unset"};
  margin-inline: ${(props) => props.marginInline ?? "unset"};
  margin-top: ${(props) => `${props.mt}rem` ?? "unset"};
  padding-left: ${(props) => `${props.pl}rem` ?? "unset"};
`;

export const FlexColumn = styled.div<FlexProps>`
  display: flex;
  align-items: ${(props) => props.align ?? "unset"};
  flex-direction: column;
  justify-content: ${(props) => props.justify ?? "flex-start"};
  gap: ${(props) => (props.gap ? `${props.gap}rem` : "0.5rem")};
  width: ${(props) => props.width ?? "unset"};
  margin-inline: ${(props) => props.marginInline ?? "unset"};
  margin-top: ${(props) => `${props.mt}rem` ?? "unset"};
  padding-left: ${(props) => `${props.pl}rem` ?? "unset"};
`;
