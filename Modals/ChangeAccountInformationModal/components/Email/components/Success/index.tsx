import { Button } from "@components/Button";
import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import { media } from "@styles/media-query";
import { ImagesPath } from "@utils/icons";
import { useSetChangeAccountInformationModal } from "Modals/ChangeAccountInformationModal/hook";
import Image from "next/image";
import styled from "styled-components";

type EmailSuccessfullyUpdatedProps = {
  email: string;
};

export const EmailSuccessfullyUpdated = ({
  email,
}: EmailSuccessfullyUpdatedProps) => {
  const setAccountSettingsModal = useSetChangeAccountInformationModal();

  const close = () => {
    setAccountSettingsModal(null);
  };

  return (
    <Container>
      <FlexColumn justify="center" align="center" gap={2} height="100%">
        <Text variant="h1">Done!</Text>
        <Image
          src={ImagesPath.PeaceOfMindoBro}
          width={200}
          height={200}
          alt="Peace of mind"
        />
        <Text variant="h3" fontWeight="normal" align="center">
          Your e-mail was changed to <strong>{email}</strong>.
        </Text>
        <Button fullWidth onClick={close}>
          Go to your profile
        </Button>
      </FlexColumn>
    </Container>
  );
};

const Container = styled.div`
  width: 300px;
  height: 100%;
  margin: auto;

  ${media.up.tablet`
    width: 100%;
  `}
`;
