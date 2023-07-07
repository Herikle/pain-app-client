import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { theme } from "@styles/theme";
import Image from "next/image";
import styled from "styled-components";

type QualityAttributeProps = {
  iconPath: string;
  label: string;
  description: string;
};

export const QualityAttribute = ({
  iconPath,
  label,
  description,
}: QualityAttributeProps) => {
  return (
    <Container gap={0.5}>
      <Image
        src={iconPath}
        width={32}
        height={32}
        alt={`Attribute ${label} Icon`}
      />
      <FlexColumn>
        <Text variant="body2Bold">{label}</Text>
        <Text variant="body2">{description}</Text>
      </FlexColumn>
    </Container>
  );
};

const Container = styled(FlexRow)`
  padding: 0.5rem;
  width: fit-content;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${theme.colors.hover_state};
  }
`;
