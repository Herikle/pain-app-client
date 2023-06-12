import { Text } from "@components/Text";
import { CaretLeft } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

type BackButtonProps = {
  href: string;
  text: React.ReactNode;
};

export const BackButton = ({ href, text }: BackButtonProps) => {
  return (
    <Link href={href}>
      <BackButtonStyled>
        <BackIcon>
          <CaretLeft size={12} weight="bold" color={theme.colors.font_color} />
        </BackIcon>
        <Text color="text_switched">{text}</Text>
      </BackButtonStyled>
    </Link>
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
`;
