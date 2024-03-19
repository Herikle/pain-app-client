import { Text, TextVariant } from "@components/Text";
import { FlexColumn, FlexRow } from "@design-components/Flex";
import { Icon, PencilSimpleLine } from "@phosphor-icons/react";
import { media } from "@styles/media-query";
import { theme } from "@styles/theme";
import Image from "next/image";
import styled from "styled-components";

type Props = {
  iconPath: string;
  label?: string;
  description?: string;
  descriptionVariant?: TextVariant;
  descriptionWeight?: string;
  EditPhorphorIcon?: Icon;
  onClickEdit?: () => void;
  editIconAlwaysVisible?: boolean;
};

export const Badge = ({
  label,
  iconPath,
  description,
  descriptionVariant = "body2",
  descriptionWeight,
  onClickEdit,
  editIconAlwaysVisible,
  EditPhorphorIcon,
}: Props) => {
  return (
    <Container data-testid="badge-container">
      <ImageBox>
        <Image
          src={iconPath}
          alt="UserIcon"
          width={40}
          height={45}
          data-testid="badge-icon"
        />
      </ImageBox>
      <DescriptionContainer gap={1}>
        <FlexRow gap={1}>
          <Text variant="h1" color="font_color">
            {label}
          </Text>
          {!!onClickEdit && (
            <EditCircleIcon
              onClick={onClickEdit}
              data-testid="badge-edit-icon"
              $alwaysVisible={!!editIconAlwaysVisible}
            >
              {EditPhorphorIcon ? (
                <EditPhorphorIcon size={16} color={theme.colors.font_color} />
              ) : (
                <PencilSimpleLine size={16} color={theme.colors.font_color} />
              )}
            </EditCircleIcon>
          )}
        </FlexRow>
        {description && (
          <Text
            variant={descriptionVariant}
            color="font_color"
            fontWeight={descriptionWeight}
          >
            {description}
          </Text>
        )}
      </DescriptionContainer>
    </Container>
  );
};

type EditCircleProps = {
  $alwaysVisible: boolean;
};

const EditCircleIcon = styled.div<EditCircleProps>`
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
  opacity: ${({ $alwaysVisible }) => ($alwaysVisible ? 1 : 0)};

  ${media.up.tablet`
    opacity: 1;
  `}
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
