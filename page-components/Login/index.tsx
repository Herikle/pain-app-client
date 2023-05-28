import { Button } from "@components/Button";
import { Checkbox } from "@components/Checkbox";
import { Text } from "@components/Text";
import { TextField } from "@components/TextField";
import { GoogleLogo } from "@phosphor-icons/react";
import { FlexRow } from "design-components/Flex";
import styled from "styled-components";
import { getPayloadFromSubmitForm } from "utils/helpers/data";

export type LoginPayload = {
  email: string;
  password: string;
  remember: boolean;
};

type SubmitFormPayload = {
  email: string;
  password: string;
  remember: string;
};

type Props = {
  onSubmit: (payload: LoginPayload) => void;
  loading?: boolean;
};

export const Login = ({ onSubmit, loading }: Props) => {
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = getPayloadFromSubmitForm<SubmitFormPayload>(e);

    onSubmit({
      email: payload.email,
      password: payload.password,
      remember: payload.remember === "on",
    });
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Container>
        <Text variant="h1" align="center">
          Welcome back!
        </Text>
        <TextField label="Your e-mail" type="email" name="email" required />
        <TextField
          label="Your password"
          type="password"
          name="password"
          required
        />
        <Checkbox label="Remember your info" name="remember" />
        <Buttons>
          <Button fullWidth type="submit" loading={loading}>
            Log in
          </Button>
          {/* <Text variant="body2Bold" color="font_color">
            or
          </Text>
          <Button fullWidth color="font_color">
            <FlexRow>
              <GoogleLogo size={22} weight="bold" />
              Continue with Google
            </FlexRow>
          </Button> */}
        </Buttons>
      </Container>
    </form>
  );
};

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;
