import styled, { CSSProperties, css } from "styled-components";
import { ThemeColors, theme } from "@styles/theme";
import { NextFont } from "next/dist/compiled/@next/font";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "body1"
  | "body1Bold"
  | "body2"
  | "body2Bold"
  | "caption";
type TextAlign = "left" | "center" | "right";

const variants: Record<TextVariant, any> = {
  h1: css`
    font-size: 24px;
    font-weight: 700;
  `,
  h2: css`
    font-size: 20px;
    font-weight: 700;
  `,
  h3: css`
    font-size: 18px;
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

interface TextProps extends React.ComponentPropsWithoutRef<"span"> {
  children: React.ReactNode;
  customColor?: string;
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
  textElipsis?: boolean;
  maxWidth?: string;
  minWidth?: string;
  fontFamily?: NextFont;
  transition?: CSSProperties["transition"];
  fontStyle?: CSSProperties["fontStyle"];
}

export const Text = ({
  children,
  customColor,
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
  textElipsis,
  maxWidth,
  minWidth,
  fontFamily,
  transition,
  fontStyle,
  ...rest
}: TextProps) => {
  return (
    <TextStyled
      className={fontFamily?.className}
      style={{
        marginTop: mt ? `${mt}rem` : undefined,
        paddingInline: px ? `${px}rem` : undefined,
      }}
      $variant={variant}
      $color={customColor ?? theme.colors[color]}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $align={align}
      $opacity={opacity}
      $whiteSpace={whiteSpace}
      $decoration={decoration}
      $textElipsis={textElipsis}
      $maxWidth={maxWidth}
      $minWidth={minWidth}
      $transition={transition}
      $fontStyle={fontStyle}
      title={textElipsis ? (children as string) : undefined}
      {...rest}
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
  $maxWidth?: string;
  $textElipsis?: boolean;
  $minWidth?: string;
  $transition?: CSSProperties["transition"];
  $fontStyle?: CSSProperties["fontStyle"];
};

const TextStyled = styled.span<TextStyledProps>`
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

    ${({ $textElipsis }) =>
    $textElipsis &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      max-width: 200px;
    `}

    ${({ $maxWidth }) =>
    $maxWidth &&
    css`
      max-width: ${$maxWidth};
    `}

    ${({ $minWidth }) =>
    $minWidth &&
    css`
      min-width: ${$minWidth};
    `}

    ${({ $transition }) =>
    $transition &&
    css`
      transition: ${$transition};
    `}

    ${({ $fontStyle }) =>
    $fontStyle &&
    css`
      font-style: ${$fontStyle};
    `}
`;
