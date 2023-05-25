"use client";

import { css, styled } from "styled-components";
import { ThemeColors, theme } from "@styles/theme";

export type TextVariant = "h1" | "body1" | "body1Bold" | "body2" | "body2Bold";
type TextAlign = "left" | "center" | "right";

const variants: Record<TextVariant, any> = {
  h1: css`
    font-size: 48px;
    font-weight: 700;
  `,
  body1: css`
    font-size: 16px;
    font-weight: 400;
  `,
  body1Bold: css`
    font-size: 16px;
    font-weight: 700;
  `,
  body2: css`
    font-size: 14px;
    font-weight: 400;
  `,
  body2Bold: css`
    font-size: 14px;
    font-weight: 700;
  `,
};

type TextProps = {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: ThemeColors;
  fontSize?: string;
  fontWeight?: string;
  align?: TextAlign;
};

export const Text = ({
  children,
  color = "font_color",
  variant = "body1",
  fontSize,
  fontWeight,
  align,
}: TextProps) => {
  return (
    <TextStyled
      $variant={variant}
      $color={theme.colors[color]}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $align={align}
    >
      {children}
    </TextStyled>
  );
};

type TextStyledProps = {
  $variant: TextVariant;
  $color: string;
  $fontSize?: string;
  $fontWeight?: string;
  $align?: TextAlign;
};

const TextStyled = styled.span<TextStyledProps>`
  font-family: inherit;
  ${({ $variant }) => variants[$variant]}
  ${({ $color }) => css`
    color: ${$color};
  `}
  ${({ $fontSize }) =>
    $fontSize &&
    css`
      font-size: ${$fontSize};
    `}

  ${({ $fontWeight }) =>
    $fontWeight &&
    css`
      font-weight: ${$fontWeight};
    `}

  ${({ $align }) =>
    $align &&
    css`
      text-align: ${$align};
    `}
`;
