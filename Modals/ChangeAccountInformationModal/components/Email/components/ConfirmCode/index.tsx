import Image from "next/image";
import styled from "styled-components";
import PinInput from "react-pin-input";
import { Text } from "@components/Text";
import { FlexColumn } from "@design-components/Flex";
import { useAuth } from "@utils/hooks/useAuth";
import { ImagesPath } from "@utils/icons";
import { theme } from "@styles/theme";
import { useEffect, useState } from "react";
import { secondsToMinutesAndSeconds } from "@utils/helpers/time";
import { useConfirmEmailChange } from "@queries/account/useAccount";
import { LoadingWrapper } from "@components/LoadingWrapper";

type ConfirmCodeEmailChangeProps = {
  onSuccess: () => void;
  onRetrySendCode: () => void;
};

export const ConfirmCodeEmailChange = ({
  onSuccess,
  onRetrySendCode,
}: ConfirmCodeEmailChangeProps) => {
  const { user } = useAuth();

  const [counter, setCounter] = useState(90);

  const confirmEmailChange = useConfirmEmailChange();

  const handleCompletePin = async (value: string) => {
    await confirmEmailChange.mutateAsync({
      body: {
        code: value,
      },
    });
    onSuccess();
  };

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter]);

  const counterIsZero = counter === 0;

  const retrySendCode = () => {
    if (!counterIsZero) return;

    onRetrySendCode();
    setCounter(90);
  };

  return (
    <Container>
      <LoadingWrapper overContainer loading={confirmEmailChange.isLoading} />
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
            <Text
              variant="body1"
              decoration="underline"
              onClick={retrySendCode}
              color={counterIsZero ? "primary" : "font_color"}
              cursor={counterIsZero ? "pointer" : "default"}
            >
              Retry{" "}
              {!counterIsZero && <>({secondsToMinutesAndSeconds(counter)})</>}
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
