import { Button } from "@components/Button";
import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import { AccountForm } from "@page-components/AccountForm";
import { media } from "@styles/media-query";
import { useAuth } from "@utils/hooks/useAuth";
import { AccountInformationsPages } from "Modals/ChangeAccountInformationModal";
import styled from "styled-components";

type MainPageProps = {
  onChangePage?: (page: AccountInformationsPages) => void;
};

export const MainPage = ({ onChangePage }: MainPageProps) => {
  const { user } = useAuth();

  return (
    <Container>
      <Text variant="h1">Change name</Text>
      <FlexColumn mt={2} gap={3}>
        <AccountForm />
        <FlexColumn gap={1.5}>
          <Text variant="body1Bold">E-mail</Text>
          <Text variant="body1" color="text_switched">
            {user?.email}
          </Text>
          <Button fullWidth onClick={() => onChangePage?.("email")}>
            Change your e-mail
          </Button>
        </FlexColumn>
        <FlexColumn gap={1.5}>
          <Text variant="body1Bold">Password</Text>
          <Text variant="body1" color="text_switched">
            *********
          </Text>
          <Button fullWidth onClick={() => onChangePage?.("password")}>
            Change your password
          </Button>
        </FlexColumn>
      </FlexColumn>
    </Container>
  );
};

const Container = styled(FlexColumn)`
  align-items: flex-start;
  width: 700px;

  ${media.up.tablet`
    width: 100%; 
    min-width: 70vw;
  `}
`;
