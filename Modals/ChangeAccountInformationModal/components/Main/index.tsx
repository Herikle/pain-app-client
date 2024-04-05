import { Button } from "@components/Button";
import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import { AccountForm } from "@page-components/AccountForm";
import { media } from "@styles/media-query";
import { useAuth } from "@utils/hooks/useAuth";
import { AccountInformationsPages } from "Modals/ChangeAccountInformationModal";
import styled from "styled-components";
import { MainFormContainer } from "../shared-styles";
import { useRequestSetAccountPassword } from "@queries/account/useAccount";

type MainPageProps = {
  onChangePage?: (page: AccountInformationsPages) => void;
};

export const MainPage = ({ onChangePage }: MainPageProps) => {
  const { user } = useAuth();

  const requestSetPasswordMutation = useRequestSetAccountPassword();

  const requestSetPassword = async () => {
    await requestSetPasswordMutation.mutateAsync();

    onChangePage?.("setPassword");
  };

  return (
    <MainFormContainer>
      <Text variant="h1">Account settings</Text>
      <FlexColumn mt={2} gap={3} width="100%">
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
        {!user?.noPassword ? (
          <FlexColumn gap={1.5}>
            <Text variant="body1Bold">Password</Text>
            <Text variant="body1" color="text_switched">
              *********
            </Text>
            <Button fullWidth onClick={() => onChangePage?.("password")}>
              Change your password
            </Button>
          </FlexColumn>
        ) : (
          <FlexColumn gap={1.5}>
            <Text variant="body1Bold">Password</Text>
            <Text variant="body1" color="text_switched">
              {"You don't have a password set yet."}
            </Text>
            <Button
              fullWidth
              onClick={requestSetPassword}
              loading={requestSetPasswordMutation.isLoading}
            >
              Set your password
            </Button>
          </FlexColumn>
        )}
      </FlexColumn>
    </MainFormContainer>
  );
};
