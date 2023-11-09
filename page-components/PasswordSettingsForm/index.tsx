import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import { Button } from "@components/Button";
import { useSetChangePasswordModal } from "Modals/ChangePasswordModal/hook";

export const PasswordSettingsForm = () => {
  const setChangePassword = useSetChangePasswordModal();

  const openPasswordConfig = () => {
    setChangePassword({});
  };

  return (
    <FlexColumn gap={2}>
      <Text variant="h1">Account settings</Text>
      <Button
        variant="text"
        textVariant="h3"
        color="pure_white"
        textColor="pure_black"
        width="fit-content"
        onClick={openPasswordConfig}
      >
        Change your password
      </Button>
    </FlexColumn>
  );
};
