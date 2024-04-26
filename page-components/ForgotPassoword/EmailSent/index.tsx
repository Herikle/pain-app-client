import styled, { css } from "styled-components";
import { Button } from "@components/Button";
import { Text } from "@components/Text";
import { TextField } from "@components/TextField";
import { RoutesPath } from "@utils/routes";
import Link from "next/link";
import { media } from "@styles/media-query";
import { useEffect, useState } from "react";
import { secondsToMinutesAndSeconds } from "@utils/helpers/time";
import Image from "next/image";
import { ImagesPath } from "@utils/icons";
import { FlexColumn } from "@design-components/Flex";

type Props = {
  onResendClick: () => void;
};

export const EmailSent = ({ onResendClick }: Props) => {
  const [counter, setCounter] = useState(90);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter]);

  const counterIsZero = counter === 0;

  return (
    <Container>
      <Text variant="h1" align="center">
        Recover your password
      </Text>
      <Text align="center" variant="body1Bold">
        E-mail sent!
      </Text>
      <Image
        width={250}
        height={250}
        src={ImagesPath.MailSentBro}
        alt="Mail sent"
      />
      <FlexColumn align="flex-start">
        <Text align="center" variant="body1Bold">
          {"What's next?"}
        </Text>
        <Text align="left" variant="body2">
          {
            "Check your inbox. You'll receive a link to redefine your password on the e-mail you provided us."
          }
        </Text>
      </FlexColumn>
      <Text align="left" variant="body2">
        {"Didn't received an e-mail?"}{" "}
        <ResendCode onClick={onResendClick} $isDisabled={!counterIsZero}>
          <Text
            variant="body2"
            decoration="underline"
            color={counterIsZero ? "primary" : "font_color"}
          >
            Resend e-mail
          </Text>{" "}
          {!counterIsZero && (
            <Text variant="body2">{`(${secondsToMinutesAndSeconds(
              counter
            )})`}</Text>
          )}
        </ResendCode>
      </Text>
    </Container>
  );
};

type ResendCodeProps = {
  $isDisabled: boolean;
};

const ResendCode = styled.div<ResendCodeProps>`
  cursor: pointer;
  display: inline-block;
  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      pointer-events: none;
    `}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  width: 300px;
  margin-inline: auto;
  ${media.up.mobileM`
    padding-inline: 1.5rem;   
  `}
`;
