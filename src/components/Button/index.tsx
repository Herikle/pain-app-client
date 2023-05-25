"use client";

import { css, styled } from "styled-components";
import { Text } from "../Text";
import { ButtonColors, ThemeColors, theme } from "@/style/theme";

type ButtonProps = {
  children: React.ReactNode;
  color?: ButtonColors;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  width?: string;
};

export const Button = ({
  children,
  loading,
  onClick,
  color = "primary",
  fullWidth = false,
  width,
}: ButtonProps) => {
  return (
    <ButtonContainer
      onClick={onClick}
      $color={theme.colors[color]}
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
  $hoverColor?: string;
  $fullWidth: boolean;
  $width?: string;
};

const ButtonContainer = styled.button<ButtonContainerProps>`
  padding: 10px;
  border: none;
  border-radius: 4px;
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
