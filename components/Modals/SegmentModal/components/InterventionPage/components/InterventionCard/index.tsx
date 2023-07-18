import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { CheckCircle, Trash, XCircle } from "@phosphor-icons/react";
import { ThemeColors, theme } from "@styles/theme";
import React from "react";
import styled, { css, keyframes } from "styled-components";
import { IIntervetion } from "types";

type InterventionCard = {
  intervention: IIntervetion;
  onClick?: () => void;
  onClickDelete?: () => void;
  isActive?: boolean;
};

export const InterventionCard = ({
  intervention,
  onClick,
  onClickDelete,
  isActive,
}: InterventionCard) => {
  const { name, effective, datetime } = intervention;

  const textColor = (): ThemeColors => {
    if (isActive) {
      return "pure_white";
    }

    return "font_color";
  };

  const onDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClickDelete?.();
  };

  return (
    <Container onClick={onClick} justify="space-between" $isActive={isActive}>
      <DetailsContainer align="flex-start">
        <NameContainer>
          <Text
            variant="body2Bold"
            color={textColor()}
            transition="color 0.2s ease-in-out"
          >
            {name}
          </Text>
          {effective ? (
            <CheckCircle
              size={16}
              color={theme.colors.green_success}
              weight="fill"
            />
          ) : (
            <XCircle
              size={16}
              color={theme.colors.dark_red_danger}
              weight="fill"
            />
          )}
        </NameContainer>
        <Text color={textColor()} transition="color 0.2s ease-in-out">
          {datetime}
        </Text>
      </DetailsContainer>
      <DeleteContainer onClick={onDelete}>
        <Trash size={20} color={theme.colors.red_danger} />
      </DeleteContainer>
    </Container>
  );
};

const ClickAnimation = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }

`;

const DeleteContainer = styled(FlexRow)`
  background-color: ${theme.colors.pure_white};
  padding: 0.5rem;
  border-radius: 50%;

  &:active {
    animation: ${ClickAnimation} 0.2s ease-in-out;
  }
`;

const NameContainer = styled(FlexRow)``;

const DetailsContainer = styled(FlexColumn)``;

type ContainerProps = {
  $isActive?: boolean;
};

const Container = styled(FlexRow)<ContainerProps>`
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  border-radius: 2px;

  ${({ $isActive }) =>
    $isActive
      ? css`
          background-color: ${theme.colors.primary};
        `
      : css`
          &:hover {
            background-color: ${theme.colors.hover_state};
          }
        `}
`;
