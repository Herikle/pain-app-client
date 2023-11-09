import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { PencilSimpleLine } from "@phosphor-icons/react";
import { theme } from "@styles/theme";
import Image from "next/image";
import styled from "styled-components";

type Props = {
  iconPath: string;
  label?: string;
  description?: string;
  onClickEdit?: () => void;
};

export const Badge = ({ label, iconPath, description, onClickEdit }: Props) => {
  return (
    <Container>
      <ImageBox>
        <Image src={iconPath} alt="UserIcon" width={40} height={45} />
      </ImageBox>
      <DescriptionContainer>
        <FlexRow gap={1}>
          <Text variant="h1" color="font_color">
            {label}
          </Text>
          {!!onClickEdit && (
            <EditCircleIcon onClick={onClickEdit}>
              <PencilSimpleLine size={16} color={theme.colors.font_color} />
            </EditCircleIcon>
          )}
        </FlexRow>
        {description && (
          <Text variant="body2" color="font_color">
            {description}
          </Text>
        )}
      </DescriptionContainer>
    </Container>
  );
};

const EditCircleIcon = styled.div`
  border-radius: 50%;
  cursor: pointer;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease-in-out, opacity 0.2s ease-in-out;
  &:hover {
    background-color: ${theme.colors.text_switched};
  }
  opacity: 0;
`;

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

  &:hover {
    ${EditCircleIcon} {
      opacity: 1;
    }
  }
`;
