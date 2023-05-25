"use client";

import { css, styled } from "styled-components";
import { Text } from "../Text";
import { ButtonColors, theme } from "@styles/theme";

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
  fullWidth = false,
  width,
}: ButtonProps) => {
  return (
    <ButtonContainer
      onClick={onClick}
      $color={theme.colors[color]}
      $variant={variant}
      $hoverColor={theme.hover_state[color]}
      $fullWidth={fullWidth}
      $width={width}
    >
      <Text color="pure_white" variant="body2Bold">
        {children}
      </Text>
    </ButtonContainer>
  );
};

type ButtonContainerProps = {
  $color: string;
  $variant: ButtonVariants;
  $hoverColor?: string;
  $fullWidth: boolean;
  $width?: string;
};

const ButtonContainer = styled.button<ButtonContainerProps>`
  padding: 10px;
  border-radius: 4px;

  ${({ $variant }) => variants[$variant]};

  ${({ $color }) => css`
    background-color: ${$color};
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
  &:hover {
    cursor: pointer;
    ${({ $hoverColor }) => css`
      background-color: ${$hoverColor};
    `}
  }
`;
