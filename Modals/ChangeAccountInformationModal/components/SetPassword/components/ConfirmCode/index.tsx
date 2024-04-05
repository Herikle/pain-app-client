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
import { useConfirmSetPasswordCode } from "@queries/account/useAccount";
import { LoadingWrapper } from "@components/LoadingWrapper";
import { media } from "@styles/media-query";

type ConfirmCodeSetPasswordProps = {
  onSuccess: (secret_token: string) => void;
  onRetrySendCode: () => void;
};

export const ConfirmCodeSetPassword = ({
  onSuccess,
  onRetrySendCode,
}: ConfirmCodeSetPasswordProps) => {
  const { user } = useAuth();

  const [counter, setCounter] = useState(90);

  const confirmSetPasswordCode = useConfirmSetPasswordCode();

  const handleCompletePin = async (value: string) => {
    const secret_token = await confirmSetPasswordCode.mutateAsync({
      body: {
        code: value,
      },
    });
    onSuccess(secret_token);
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
      <LoadingWrapper overContainer loading={false} />
      <FlexColumn justify="center" align="center" gap={2} height="100%">
        <Image
          src={ImagesPath.MailSentBro}
          width={250}
          height={250}
          alt="Mail sent"
        />
        <Text variant="body1" align="center">
          In order to proceed, we sent a code to your e-mail,{" "}
          <strong>{user?.email}</strong>
        </Text>
        <Text variant="body1">Enter the six-digit code you received here:</Text>
        <PinInputContainer
          mt={1}
          justify="center"
          align="center"
          gap={3}
          width="100%"
        >
          <PinInput length={6} onComplete={handleCompletePin} type="custom" />
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
        </PinInputContainer>
      </FlexColumn>
    </Container>
  );
};

const PinInputContainer = styled(FlexColumn)`
  & .pincode-input-text {
    width: 74px !important;
    height: 88px !important;
    background-color: ${theme.colors.pastel};
    border: 1px solid ${theme.colors.dark_pastel};
    border-radius: 14px;
    font-size: 24px;
    font-weight: normal;
    ${media.up.tablet`
      width: 100% !important;    
      height: 60px !important;  
    `};
  }

  & .pincode-input-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    ${media.up.tablet`
      gap: 0.25rem;
    `};
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
`;
