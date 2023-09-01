import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { Pencil, Trash } from "@phosphor-icons/react";
import { media } from "@styles/media-query";
import { ThemeColors, theme } from "@styles/theme";
import { dateAndTimeFormat } from "@utils/helpers/date";
import React from "react";
import styled, { css, keyframes } from "styled-components";
import { ISymptom } from "types";

type SymptomCard = {
  symptom: ISymptom;
  onClick?: () => void;
  onClickDelete?: () => void;
  onClickEdit?: () => void;
  isActive?: boolean;
};

const ICON_SIZE = 20;

export const SymptomCard = ({
  symptom,
  onClick,
  onClickDelete,
  onClickEdit,
  isActive,
}: SymptomCard) => {
  const { name, datetime } = symptom;

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

  const onEdit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClickEdit?.();
  };

  return (
    <Container onClick={onClick} justify="space-between" $isActive={isActive}>
      <DetailsContainer align="flex-start">
        <NameContainer>
          <Text
            variant="body2Bold"
            color={textColor()}
            transition="color 0.2s ease-in-out"
            maxWidth="200px"
            textElipsis
          >
            {name}
          </Text>
        </NameContainer>
        <Text color={textColor()} transition="color 0.2s ease-in-out">
          {dateAndTimeFormat(datetime)}
        </Text>
      </DetailsContainer>
      <IconsContainer>
        <IconContainer onClick={onEdit}>
          <Pencil size={ICON_SIZE} color={theme.colors.primary} />
        </IconContainer>
        <IconContainer onClick={onDelete}>
          <Trash size={ICON_SIZE} color={theme.colors.red_danger} />
        </IconContainer>
      </IconsContainer>
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

const IconsContainer = styled(FlexRow)`
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  display: none;
`;

const IconContainer = styled(FlexRow)`
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
          ${media.up.tablet`
            ${IconsContainer} {
              opacity: 1;
              display:flex;
            }
          `}
        `
      : css`
          &:hover {
            background-color: ${theme.colors.hover_state};
          }
        `}

  &:hover ${IconsContainer} {
    opacity: 1;
  }
`;
