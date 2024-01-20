import { Text } from "@components/Text";
import { CaretLeft } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

type BackButtonProps = {
  href?: string;
  onClick?: () => void;
  text: React.ReactNode;
};

export const BackButton = ({ href, text, onClick }: BackButtonProps) => {
  const render = (children: JSX.Element) => {
    if (href) {
      return (
        <Link href={href} data-testid="back-button-link">
          {children}
        </Link>
      );
    }

    return children;
  };

  return render(
    <BackButtonStyled onClick={onClick} data-testid="back-button">
      <BackIcon>
        <CaretLeft
          size={12}
          weight="bold"
          color={theme.colors.font_color}
          data-testid="back-button-icon"
        />
      </BackIcon>
      <Text color="text_switched">{text}</Text>
    </BackButtonStyled>
  );
};

const BackIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${theme.colors.hover_state};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackButtonStyled = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  width: fit-content;
`;
