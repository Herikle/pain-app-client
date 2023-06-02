import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { theme } from "@styles/theme";
import Image from "next/image";
import styled from "styled-components";

type Props = {
  label: string;
  iconPath: string;
  description?: string;
};

export const Badge = ({ label, iconPath, description }: Props) => {
  return (
    <Container>
      <ImageBox>
        <Image src={iconPath} alt="UserIcon" width={40} height={45} />
      </ImageBox>
      <DescriptionContainer>
        <Text variant="h1" color="font_color">
          {label}
        </Text>
        {description && (
          <Text variant="body2" color="font_color">
            {description}
          </Text>
        )}
      </DescriptionContainer>
    </Container>
  );
};

const DescriptionContainer = styled(FlexColumn)``;

const ImageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.cta};
  border-radius: 10px;
  padding: 0.5rem;
`;

const Container = styled(FlexRow)`
  gap: 1rem;
`;
