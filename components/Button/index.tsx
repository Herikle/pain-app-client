import styled, { css } from "styled-components";
import { Text, TextVariant } from "../Text";
import { ButtonColors, ThemeColors, theme } from "@styles/theme";
import { NextFont } from "next/dist/compiled/@next/font";
import { ButtonHTMLAttributes } from "react";
import { Oval } from "react-loader-spinner";

export type ButtonVariants = "contained" | "outlined" | "text";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariants;
  color?: ButtonColors;
  onClick?: (e: React.MouseEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  width?: string;
  font?: NextFont;
  textVariant?: TextVariant;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  textColor?: ThemeColors;
  noPadding?: boolean;
};

const variants: Record<ButtonVariants, any> = {
  contained: css`
    border: none;
  `,
  outlined: css`
    border: 1px solid ${theme.colors.pure_white};
  `,
  text: css`
    border: none;
    background-color: transparent;
  `,
};

export const Button = ({
  children,
  variant = "contained",
  onClick,
  color = "primary",
  loading,
  disabled,
  fullWidth = false,
  width,
  font,
  textVariant = "body2Bold",
  type,
  textColor,
  noPadding,
}: ButtonProps) => {
  const getTextColors = () => {
    if (textColor) {
      return textColor;
    }

    if (disabled) {
      return "secondary_font";
    }

    return "pure_white";
  };

  return (
    <ButtonContainer
      className={font?.className}
      onClick={onClick}
      type={type}
      $color={theme.colors[color]}
      $variant={variant}
      $hoverColor={theme.hover_state[color]}
      $fullWidth={fullWidth}
      $width={width}
      $disabled={disabled || loading}
      $noPadding={noPadding}
      disabled={disabled || loading}
    >
      {loading ? (
        <LoadingWrapper>
          <Oval
            height="20"
            color={theme.colors.pure_white}
            secondaryColor={theme.colors.secondary_color}
          />
        </LoadingWrapper>
      ) : (
        <Text color={getTextColors()} variant={textVariant}>
          {children}
        </Text>
      )}
    </ButtonContainer>
  );
};

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type ButtonContainerProps = {
  $color: string;
  $variant: ButtonVariants;
  $hoverColor?: string;
  $fullWidth: boolean;
  $width?: string;
  $disabled?: boolean;
  $noPadding?: boolean;
};

const ButtonContainer = styled.button<ButtonContainerProps>`
  padding: 10px;
  padding: ${({ $noPadding }) => $noPadding && 0};
  border-radius: 4px;
  position: relative;
  font-family: inherit;
  min-height: 37px;

  ${({ $color, $disabled }) => css`
    background-color: ${$disabled ? theme.colors.disabled_color : $color};
  `}
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  transition: background-color 0.2s ease-in-out;
  ${({ $disabled, $hoverColor }) =>
    !$disabled
      ? css`
          cursor: pointer;
          &:hover {
            background-color: ${$hoverColor};
          }
        `
      : css`
          cursor: not-allowed;
        `}

  ${({ $variant }) => variants[$variant]};
`;
