import { Text } from "@components/Text";
import { TooltipContent } from "@components/TooltipContent";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { CheckCircle, Pencil, Trash, XCircle } from "@phosphor-icons/react";
import { media } from "@styles/media-query";
import { ThemeColors, theme } from "@styles/theme";
import { dateAndTimeFormat } from "@utils/helpers/date";
import React from "react";
import styled, { css, keyframes } from "styled-components";
import { IIntervetion } from "types";

type InterventionCard = {
  intervention: IIntervetion;
  onClick?: () => void;
  onClickDelete?: () => void;
  onClickEdit?: () => void;
  isActive?: boolean;
};

const ICON_SIZE = 20;

const EFFECTIVE_TEXT = "Effective intervention";
const INEFFECTIVE_TEXT = "Ineffective intervention";

export const InterventionCard = ({
  intervention,
  onClick,
  onClickDelete,
  onClickEdit,
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

  const onEdit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClickEdit?.();
  };

  return (
    <Container
      onClick={onClick}
      justify="space-between"
      $isActive={isActive}
      $hasOnClick={!!onClick}
    >
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
          <TooltipContent
            tooltip={effective ? EFFECTIVE_TEXT : INEFFECTIVE_TEXT}
          >
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
          </TooltipContent>
        </NameContainer>
        <Text color={textColor()} transition="color 0.2s ease-in-out">
          {dateAndTimeFormat(datetime)}
        </Text>
      </DetailsContainer>
      <IconsContainer>
        {!!onClickEdit && (
          <IconContainer onClick={onEdit}>
            <Pencil size={ICON_SIZE} color={theme.colors.primary} />
          </IconContainer>
        )}
        {!!onClickDelete && (
          <IconContainer onClick={onDelete}>
            <Trash size={ICON_SIZE} color={theme.colors.red_danger} />
          </IconContainer>
        )}
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
  $hasOnClick: boolean;
};

const Container = styled(FlexRow)<ContainerProps>`
  padding: 1rem;

  transition: background-color 0.2s ease-in-out;
  border-radius: 2px;

  ${({ $isActive, $hasOnClick }) =>
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
      : $hasOnClick &&
        css`
          &:hover {
            background-color: ${theme.colors.hover_state};
          }
        `}

  ${({ $hasOnClick }) =>
    $hasOnClick &&
    css`
      cursor: pointer;
      &:hover ${IconsContainer} {
        opacity: 1;
      }
    `}
`;
