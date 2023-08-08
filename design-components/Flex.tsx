import styled, { CSSProperties } from "styled-components";

type FlexProps = {
  gap?: number;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  width?: CSSProperties["width"];
  marginInline?: CSSProperties["marginInline"];
  height?: CSSProperties["height"];
  mt?: number;
  mb?: number;
  pl?: number;
};

const writeSizeProperty = (size?: number) => (size ? `${size}rem` : "unset");

export const FlexRow = styled.div<FlexProps>`
  display: flex;
  align-items: ${(props) => props.align ?? "center"};
  justify-content: ${(props) => props.justify ?? "center"};
  gap: ${(props) => (props.gap ? `${props.gap}rem` : "0.5rem")};
  width: ${(props) => props.width ?? "unset"};
  margin-inline: ${(props) => props.marginInline ?? "unset"};
  margin-top: ${(props) => writeSizeProperty(props.mt)};
  margin-bottom: ${(props) => writeSizeProperty(props.mb)};
  padding-left: ${(props) => writeSizeProperty(props.pl)};
  height: ${(props) => props.height ?? "unset"};
`;

export const FlexColumn = styled.div<FlexProps>`
  display: flex;
  align-items: ${(props) => props.align ?? "unset"};
  flex-direction: column;
  justify-content: ${(props) => props.justify ?? "flex-start"};
  gap: ${(props) => (props.gap ? `${props.gap}rem` : "0.5rem")};
  width: ${(props) => props.width ?? "unset"};
  margin-inline: ${(props) => props.marginInline ?? "unset"};
  margin-top: ${(props) => writeSizeProperty(props.mt)};
  margin-bottom: ${(props) => writeSizeProperty(props.mb)};
  padding-left: ${(props) => writeSizeProperty(props.pl)};
  height: ${(props) => props.height ?? "unset"};
`;
