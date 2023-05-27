import { Text } from "@components/Text";
import { FlexColumn, FlexRow } from "design-components/Flex";
import Image from "next/image";
import Link from "next/link";
import { styled } from "styled-components";
import { IconsPath } from "utils/icons";
import { RoutesPath } from "utils/routes";

type Props = {
  label: string;
  iconPath: string;
  description?: string;
};

export const SideMenuLink = ({ label, iconPath, description }: Props) => {
  return (
    <LinkContainer href={RoutesPath.prompt}>
      <Container>
        <Image src={iconPath} alt="Chat GPT icon" width="36" height="36" />
        <DescriptionContainer>
          {description && <Text color="pure_white">{description}</Text>}
          <Text variant="body2Bold" color="pure_white">
            {label}
          </Text>
        </DescriptionContainer>
      </Container>
    </LinkContainer>
  );
};

const DescriptionContainer = styled(FlexColumn)`
  gap: 0;
`;

const Container = styled(FlexRow)`
  width: 100%;
  justify-content: flex-start;
  padding-left: 1.5rem;
`;

const LinkContainer = styled(Link)`
  width: 100%;
`;
