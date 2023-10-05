import styled, { css } from "styled-components";
import { Button } from "@components/Button";
import { Text } from "@components/Text";
import { TextField } from "@components/TextField";
import { RoutesPath } from "utils/routes";
import Link from "next/link";
import { media } from "@styles/media-query";
import { useEffect, useState } from "react";
import { secondsToMinutesAndSeconds } from "@utils/helpers/time";

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
        Reset your password
      </Text>
      <Text align="center" variant="body2Bold">
        E-mail sent!
      </Text>
      <Text align="left" variant="body2">
        Check your e-mail for a link, and click on it to reset your password.
      </Text>
      <Text align="left" variant="body2">
        {"Didn't got an e-mail?"}{" "}
        <ResendCode onClick={onResendClick} $isDisabled={!counterIsZero}>
          <Text
            variant="body2"
            decoration="underline"
            color={counterIsZero ? "primary" : "font_color"}
          >
            Resend code
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
  gap: 2.5rem;
  ${media.up.mobileM`
    padding-inline: 1.5rem;   
  `}
`;
