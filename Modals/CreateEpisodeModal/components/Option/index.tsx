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
  "data-cy"?: string;
};

export const Option = ({
  srcImage,
  icon,
  alt,
  title,
  description,
  onClick,
  "data-cy": dataCy,
}: OptionProps) => {
  return (
    <OptionContainer onClick={onClick} $hasClick={!!onClick} data-cy={dataCy}>
      {srcImage && (
        <IconDiv>
          <Image src={srcImage} width={40} height={40} alt={alt} />
        </IconDiv>
      )}
      {icon && <IconDiv>{icon}</IconDiv>}
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

const IconDiv = styled.div`
  flex-shrink: 0;
  display: flex;
`;

const OptionDescription = styled(FlexColumn)`
  gap: 1rem;
  max-width: 100%;
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
