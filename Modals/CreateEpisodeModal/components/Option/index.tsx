import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { theme } from "@styles/theme";
import Image from "next/image";
import { transparentize } from "polished";
import styled, { css } from "styled-components";

type OptionProps = {
  srcImage?: string;
  icon?: React.ReactNode;
  alt: string;
  title: string;
  description?: string;
  onClick?: () => void;
};

export const Option = ({
  srcImage,
  icon,
  alt,
  title,
  description,
  onClick,
}: OptionProps) => {
  return (
    <OptionContainer onClick={onClick} $hasClick={!!onClick}>
      {srcImage && <Image src={srcImage} width={40} height={40} alt={alt} />}
      {icon && icon}
      <OptionDescription>
        <Text variant="h1">{title}</Text>
        {description && (
          <Text variant="h3" fontWeight="400">
            {description}
          </Text>
        )}
      </OptionDescription>
    </OptionContainer>
  );
};

const OptionDescription = styled(FlexColumn)`
  gap: 1rem;
`;

type ContainerProps = {
  $hasClick: boolean;
};

const OptionContainer = styled(FlexRow)<ContainerProps>`
  gap: 1rem;
  padding: 1rem;
  justify-content: flex-start;

  ${({ $hasClick }) =>
    $hasClick &&
    css`
      transition: background-color 0.2s ease-in-out;
      cursor: pointer;
      &:hover {
        background-color: ${transparentize(0.9, theme.colors.pure_black)};
      }
    `}

  border-radius: 4px;
`;
