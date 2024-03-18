import Image from "next/image";
import styled from "styled-components";
import PinInput from "react-pin-input";
import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import { useAuth } from "@utils/hooks/useAuth";
import { ImagesPath } from "@utils/icons";
import { theme } from "@styles/theme";

export const ConfirmCodeEmailChange = () => {
  const { user } = useAuth();

  const handleCompletePin = (value: string) => {
    console.log(value);
  };

  return (
    <Container>
      <FlexColumn justify="center" align="center" gap={2} height="100%">
        <Image
          src={ImagesPath.MailSentBro}
          width={250}
          height={250}
          alt="Mail sent"
        />
        <Text variant="body1" align="center">
          In order to proceed, we sent a code to your previous e-mail,{" "}
          <strong>{user?.email}</strong>
        </Text>
        <Text variant="body1">Enter the six-digit code you received here:</Text>
        <FlexColumn mt={1} justify="center" align="center" gap={3} width="100%">
          <PinInput
            length={6}
            onComplete={handleCompletePin}
            inputStyle={{
              backgroundColor: theme.colors.pastel,
              border: `1px solid ${theme.colors.dark_pastel}`,
              borderRadius: "14px",
              height: "88px",
              width: "74px",
              fontSize: "24px",
              fontWeight: "normal",
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          />
          <Text variant="body1">
            {"Didn't receive a link?"}{" "}
            <Text variant="body1" decoration="underline" color="primary">
              Send again
            </Text>
          </Text>
        </FlexColumn>
      </FlexColumn>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
`;
