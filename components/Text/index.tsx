import styled, { CSSProperties, css } from "styled-components";
import { ThemeColors, theme } from "@styles/theme";

export type TextVariant =
  | "h1"
  | "h3"
  | "body1"
  | "body1Bold"
  | "body2"
  | "body2Bold"
  | "caption";
type TextAlign = "left" | "center" | "right";

const variants: Record<TextVariant, any> = {
  h1: css`
    font-size: 20px;
    font-weight: 700;
  `,
  h3: css`
    font-size: 24px;
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
  caption: css`
    font-size: 12px;
    font-weight: 400;
  `,
};

type TextProps = {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: ThemeColors;
  fontSize?: string;
  fontWeight?: string;
  align?: TextAlign;
  opacity?: number;
  mt?: number;
  px?: number;
  whiteSpace?: CSSProperties["whiteSpace"];
  decoration?: CSSProperties["textDecoration"];
};

export const Text = ({
  children,
  color = "font_color",
  variant = "body1",
  fontSize,
  fontWeight,
  align,
  opacity,
  mt,
  px,
  whiteSpace,
  decoration,
}: TextProps) => {
  return (
    <TextStyled
      style={{
        marginTop: mt ? `${mt}rem` : "0px",
        paddingInline: px ? `${px}rem` : "0px",
      }}
      $variant={variant}
      $color={theme.colors[color]}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $align={align}
      $opacity={opacity}
      $whiteSpace={whiteSpace}
      $decoration={decoration}
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
  $opacity?: number;
  $whiteSpace?: string;
  $decoration?: CSSProperties["textDecoration"];
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

    ${({ $opacity }) =>
    $opacity &&
    css`
      opacity: ${$opacity};
    `}

    ${({ $whiteSpace }) =>
    $whiteSpace &&
    css`
      white-space: ${$whiteSpace};
    `}

    ${({ $decoration }) =>
    $decoration &&
    css`
      text-decoration: ${$decoration};
    `}
`;
