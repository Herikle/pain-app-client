import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { theme } from "@styles/theme";
import Image from "next/image";
import { UseFormRegisterReturn } from "react-hook-form";
import styled, { css } from "styled-components";

type QualityAttributeProps = {
  iconPath: string;
  label: string;
  description: string;
  value: string;
  isSelected?: boolean;
  isNotSelected?: boolean;
  iconSize?: number;
  onClick: (value: any) => void;
};

export const QualityAttribute = ({
  iconPath,
  label,
  description,
  onClick,
  isSelected = false,
  isNotSelected = false,
  iconSize = 32,
  value,
}: QualityAttributeProps) => {
  const handleClick = () => {
    onClick(value);
  };

  return (
    <Container
      $isSelected={isSelected}
      $isNotSelected={isNotSelected}
      onClick={handleClick}
    >
      <Image
        src={iconPath}
        width={iconSize}
        height={iconSize}
        alt={`Attribute ${label} Icon`}
      />
      <FlexColumn>
        <Text variant="body2Bold">{label}</Text>
        <Text variant="body2">{description}</Text>
      </FlexColumn>
    </Container>
  );
};

type Props = {
  $isSelected: boolean;
  $isNotSelected: boolean;
};

const Container = styled.label<Props>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  padding: 0.5rem;
  width: fit-content;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, opacity 0.2s ease-in-out;

  width: 100%;

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      background-color: ${theme.colors.hover_state};
    `}

  ${({ $isNotSelected }) =>
    $isNotSelected &&
    css`
      opacity: 0.5;
    `}

    &:hover {
    background-color: ${theme.colors.hover_state};
    opacity: 1;
  }
`;
