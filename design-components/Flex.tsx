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
  pr?: number;
  pt?: number;
  pb?: number;
  px?: number;
  py?: number;
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
  height: ${(props) => props.height ?? "unset"};
  padding-right: ${(props) => writeSizeProperty(props.pr)};
  padding-left: ${(props) => writeSizeProperty(props.pl)};
  padding-top: ${(props) => writeSizeProperty(props.pt)};
  padding-bottom: ${(props) => writeSizeProperty(props.pb)};
  padding-inline: ${(props) => writeSizeProperty(props.px)};
  padding-block: ${(props) => writeSizeProperty(props.py)};
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
  height: ${(props) => props.height ?? "unset"};
  padding-right: ${(props) => writeSizeProperty(props.pr)};
  padding-left: ${(props) => writeSizeProperty(props.pl)};
  padding-top: ${(props) => writeSizeProperty(props.pt)};
  padding-bottom: ${(props) => writeSizeProperty(props.pb)};
  padding-inline: ${(props) => writeSizeProperty(props.px)};
  padding-block: ${(props) => writeSizeProperty(props.py)};
`;
