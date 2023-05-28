import styled, { css } from "styled-components";
import { Text, TextVariant } from "../Text";
import { ButtonColors, theme } from "@styles/theme";
import { NextFont } from "next/dist/compiled/@next/font";
import { ButtonHTMLAttributes } from "react";
import { Oval } from "react-loader-spinner";

export type ButtonVariants = "contained" | "outlined";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariants;
  color?: ButtonColors;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  width?: string;
  font?: NextFont;
  textVariant?: TextVariant;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

const variants: Record<ButtonVariants, any> = {
  contained: css`
    border: none;
  `,
  outlined: css`
    border: 1px solid ${theme.colors.pure_white};
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
}: ButtonProps) => {
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
        <Text
          color={disabled ? "secondary_font" : "pure_white"}
          variant={textVariant}
        >
          {children}
        </Text>
      )}
    </ButtonContainer>
  );
};

type ButtonContainerProps = {
  $color: string;
  $variant: ButtonVariants;
  $hoverColor?: string;
  $fullWidth: boolean;
  $width?: string;
  $disabled?: boolean;
};

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ButtonContainer = styled.button<ButtonContainerProps>`
  padding: 10px;
  border-radius: 4px;
  position: relative;
  font-family: inherit;
  min-height: 37px;
  ${({ $variant }) => variants[$variant]};

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
`;
